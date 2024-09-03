import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, FormInput, MainHeading } from "src/common";
import { useForm } from "src/hooks";
import { FormState } from "src/interfaces";
import { toast } from 'react-toastify';
import { useSignUpUserMutation } from "src/service";
import { ValidationSchema } from "src/utils";

const validationSchema: ValidationSchema = {
  name: {
    required: true,
    minLength: 1,
    errorMessage: 'Name is required.',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: 'Please enter a valid email.',
  },
  password: {
    required: true,
    minLength: 6,
    errorMessage: 'Password must be at least 6 characters long.',
  },
};

export const SignUp: React.FC = () => {
  const { formData, errors, handleChange, validateAllFields } = useForm<FormState>({
    initialValues: { name: '', email: '', password: '' },
    validationSchema
  });
  const navigate = useNavigate();
  const [signUser, { isLoading }] = useSignUpUserMutation();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateAllFields()) return;

    try {
      const result = await signUser(formData).unwrap();
      if (result.auth) {
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        navigate('/');
        toast.success('User Registered successfully!');
      } else {
        alert('Sign up failed. Please try again.');
        toast.error('User registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Sign up error', error);
      alert('An error occurred during sign up. Please try again.');
    }
  };

  return (
    <div className='row justify-content-center align-items-center mx-0 h-100'>
      <div className='col-lg-4'>
      <Card>
            <MainHeading text="Register User" />
            <form onSubmit={handleSubmit}>
              <FormInput
                id="name"
                label="Name"
                type="text"
                value={formData.name}
                name="name"
                onChange={handleChange}
                placeholder="Enter your Name"
                error={errors.name}
              />
              <FormInput
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter your Email"
                error={errors.email}
              />
              <FormInput
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter your Password"
                error={errors.password}
              />
              <div className="d-flex justify-content-end">
              <Button text={isLoading ? "Signing Up..." : "Sign Up"} type="submit" disabled={isLoading} />
              </div>
            </form>
          <p className='text-center mt-3'>Already have an account? <Link to="/login">Login</Link></p>
      </Card>
      </div>
    </div>
  );
};