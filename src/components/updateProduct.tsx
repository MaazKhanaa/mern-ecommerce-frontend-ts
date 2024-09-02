import React, { useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, FormInput, MainHeading } from 'src/common';
import { useForm } from 'src/hooks';
import { Product } from 'src/interfaces';
import { useGetProductQuery, useUpdateProductMutation } from 'src/service';
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

export const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: product, error: fetchError, isLoading: isFetching, refetch } = useGetProductQuery(id || '');
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation(); 

  const { formData, errors, handleChange, validateAllFields, setFormData } = useForm<Product>({
    initialValues: {
      name: '',
      price: '',
      category: '',
      brand: '',
    },
    validationSchema,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand,
      });
    }
  }, [product, setFormData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateAllFields()) return;

    if (!id) {
      console.error('Product ID is missing');
      return;
    }

    try {
      await updateProduct({ id, ...formData }).unwrap();
      navigate('/');
      refetch()
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update the product. Please try again.');
    }
  };

  if (isFetching) {
    return <p className="text-center">Loading...</p>;
  }

  if (fetchError) {
    return <p className="text-center">Error fetching product details</p>;
  }

  return (
    <div>
      <div className="row justify-content-center mx-0">
        <div className="col-lg-5 col-sm-9">
          <MainHeading text='Update Product' />
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
            <Button text={isUpdating ? "Updating..." : "Update Product"} type='submit' disabled={isUpdating} />
          </form>
        </div>
      </div>
    </div>
  );
};