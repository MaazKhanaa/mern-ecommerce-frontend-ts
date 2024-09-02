import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'src/common';
import { Product } from 'src/interfaces';
import { useDeleteProductMutation, useGetProductsQuery } from 'src/service';
import { toast } from 'react-toastify';

export const ProductsList: React.FC = () => {
  const { data, isLoading, refetch } = useGetProductsQuery('products');
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {

    console.log('id for delete --->>', id);
    
    try {
      await deleteProduct(id).unwrap();
      toast.success('Product deleted successfully!');
      // Refetch the product list to ensure UI is updated
      refetch();
    } catch (err) {
      console.error('Failed to Delete the Product:', err);
      toast.error('Failed to delete the product. Please try again.');
    }
  };

  // Type assertion to ensure `data` is of the expected shape
  const products = data as Product[] | undefined;

  return (
    <div className="container">
      <h1>Products List</h1>
      <div className="row">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : products?.length === 0 ? (
          <p className="text-center">No products available</p>
        ) : (
          products?.map((item: any) => (
            <div className="col-12 mb-4" key={item._id}>
              <Card>
                <div className="row align-items-center">
                  <div className="col">
                    <h4>Name</h4>
                    <h5>{item.name}</h5>
                  </div>  
                  <div className="col">
                    <h5>Price</h5>
                    <h6>{item.price}</h6>
                  </div>
                  <div className="col">
                    <h5>Brand</h5>
                    <h6>{item.brand}</h6>
                  </div>
                  <div className="col">
                    <h5>Category</h5>
                    <h6>{item.category}</h6>
                  </div>
                  <div className="col">
                    <div className='d-flex justify-content-end'>
                    <Link to={`update/${item._id}`} className="btn primary-btn me-3">
                      Update
                    </Link>
                    <Button text='Delete' className='bg-danger' onClick={() => handleDelete(item._id)} />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};