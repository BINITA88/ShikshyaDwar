import React, { useEffect, useState } from 'react';
import Cards from '../../components/usercomponents/Cards';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    axios
      .get('/api/productlist')
      .then((res) => {
        // Log the response to verify the structure
        console.log('API response:', res.data);

        // Ensure the data is an array before setting it
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (res.data && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error('Unexpected data structure:', res.data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching product list:', err);
        setError('Failed to load products. Please try again later.');
      })
      .finally(() => {
        setLoading(false); // Stop loading regardless of success or failure
      });
  }, []);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : products.length > 0 ? (
          <div className="flex justify-start grid grid-cols-4 gap-9 w-full">
            {products.map((data) => (
              <Cards data={data} key={data._id} />
            ))}
          </div>
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </section>
  );
};

export default Product;
