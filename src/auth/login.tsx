import React, { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../service/api';
import { ValidationSchema } from '../utils/validation';
import { Button, Card, FormInput, MainHeading } from 'src/common';
import { useForm } from 'src/hooks';

// Define the validation schema
const validationSchema: ValidationSchema = {
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/,
    errorMessage: 'Please enter a valid email address.',
  },
  password: {
    required: true,
    minLength: 6,
    errorMessage: 'Password must be at least 6 characters long.',
  },
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  // Use the useForm hook for managing form data and validation
  const { formData, errors, handleChange, validateAllFields } = useForm({
    initialValues: { email: '', password: '' },
    validationSchema,
  });

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    // Validate all fields before submitting
    if (!validateAllFields()) return;

    try {
      const result = await loginUser(formData).unwrap();
      console.log('RTK Result', result);

      if (result.auth) {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', JSON.stringify(result.auth));
        navigate('/');
      } else {
        alert('Incorrect email or password');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className='row justify-content-center align-items-center mx-0 h-100'>
      <div className='col-lg-4'>
      <Card>
        <div className="row justify-content-center">
          <MainHeading text="Login" />
          <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              error={errors.password}
            />

            <div className='d-flex justify-content-end'>
            <Button
              text={isLoading ? 'Logging in...' : 'Login'}
              type="submit"
              disabled={isLoading}
            />
            </div>
          </form>

          <p className='text-center mt-3'>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </Card>
      </div>
    </div>
  );
};