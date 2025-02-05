import React, { useEffect, useState } from 'react';
import Carousel from '../../components/usercomponents/Carousel';
import AdmissionDescription from '../../components/usercomponents/AdmissionDescription';
import Library from '../../components/usercomponents/Library';
import Chatbox from '../../components/usercomponents/Chatbot';
import Cards from '../../components/usercomponents/Cards';
import axios from 'axios';
import Carousel1 from '../../components/usercomponents/Carousel1';

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
   
        <div>

        </div>
   
{/* Display Cards dynamically */}
<section className="py-14 px-10 bg-gradient-to-r from-white to-white">
  <div className="w-full">
    {/* Main Heading for Shikshyadwar */}
    <h2 className="text-3xl mt-7 mb-11 ml-10 font-bold text-gray-800 mb-4 text-start leading-tight">
    Explore Our Available Courses
    </h2>
    {/* Course Cards */}
    <div className="mx-auto flex px-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14">
        {products.length > 0 ? (
          products.map((product) => <Cards data={product} key={product._id} />)
        ) : (
          <p className="col-span-full text-center text-xl text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  </div>
</section>

      <AdmissionDescription />
      
      {/* <section className="py-14  px-10 flex justify-start">
        <div className="mx-auto flex px-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14">
            {products.length > 0 ? (
              products.map((product) => <Cards data={product} key={product._id} />)
            ) : (
              <p>No products available.</p>
            )}
          </div>
        </div>
      </section> */}

<Carousel1/>

      <Chatbox />
      <Library />
    </>
  );
};

export default HomePages;
