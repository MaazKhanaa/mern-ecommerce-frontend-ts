import React, { FormEvent } from 'react';
import { Button, FormInput, MainHeading } from 'src/common';
import { useForm } from 'src/hooks';
import { Product } from 'src/interfaces';
import { useAddProductMutation } from 'src/service';
import { toast } from 'react-toastify';

const validationSchema = {
  name: {
    required: true,
    minLength: 1,
    errorMessage: 'Product name is required.',
  },
  price: {
    required: true,
    pattern: /^\d+(\.\d{1,2})?$/,
    errorMessage: 'Please enter a valid price.',
  },
  category: {
    required: true,
    minLength: 1,
    errorMessage: 'Product category is required.',
  },
  brand: {
    required: true,
    minLength: 1,
    errorMessage: 'Product brand is required.',
  },
};

export const AddProducts: React.FC = () => {
  const { formData, errors, handleChange, validateAllFields, setFormData } = useForm<Product>({
    initialValues: {
      name: '',
      price: '',
      category: '',
      brand: '',
    },
    validationSchema,
  });

  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateAllFields()) return;

    const user = localStorage.getItem('user');
    if (!user) {
      console.error('No user found in localStorage');
      return;
    }

    const userId = JSON.parse(user)._id;

    try {
      await addProduct({ ...formData, userId }).unwrap();
      toast.success('Product added successfully!');
      setFormData({
        name: '',
        price: '',
        category: '',
        brand: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add the product. Please try again.');
    }
  };

  return (
    <div>
      <div className="row justify-content-center mx-0">
        <div className="col-lg-5 col-sm-9">
          <MainHeading text='Add Product' />
          <form onSubmit={handleSubmit}>
            <FormInput
              id='name'
              label='Product Name'
              type='text'
              value={formData.name}
              name='name'
              onChange={handleChange}
              placeholder='Enter product name'
              error={errors.name}
            />
            <FormInput
              id='price'
              label='Product Price'
              type='number'
              value={formData.price}
              name='price'
              onChange={handleChange}
              placeholder='Enter product price'
              error={errors.price}
            />
            <FormInput
              id='category'
              label='Product Category'
              type='text'
              value={formData.category}
              name='category'
              onChange={handleChange}
              placeholder='Enter product category'
              error={errors.category}
            />
            <FormInput
              id='brand'
              label='Product Brand'
              type='text'
              value={formData.brand}
              name='brand'
              onChange={handleChange}
              placeholder='Enter product brand'
              error={errors.brand}
            />
            <Button text={isLoading ? "Adding..." : "Add Product"} type='submit' disabled={isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
};