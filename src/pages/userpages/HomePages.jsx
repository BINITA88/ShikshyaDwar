import React, { useEffect, useState } from 'react';
import Carousel from '../../components/usercomponents/Carousel';
import AdmissionDescription from '../../components/usercomponents/AdmissionDescription';
import Library from '../../components/usercomponents/Library';
import Chatbox from '../../components/usercomponents/Chatbot';
import Cards from '../../components/usercomponents/Cards';
import axios from 'axios';

const HomePages = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend API
    axios
      .get('/api/productlist')
      .then((res) => {
        // Check the structure of API response
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (res.data && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error('Unexpected response structure:', res.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching product list:', err);
      });
  }, []);

  return (
    <>
      <Carousel />
      <AdmissionDescription />

      {/* Display Cards dynamically */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => <Cards data={product} key={product._id} />)
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </section>

      <Chatbox />
      <Library />
    </>
  );
};

export default HomePages;
