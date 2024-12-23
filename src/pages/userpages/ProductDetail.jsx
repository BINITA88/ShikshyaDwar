import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const param = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const id = param.productId;

  useEffect(() => {
    axios
      .get(`/api/productDetail/${id}`)
      .then((res) => setProduct(res.data)) // Assuming res.data contains product details
      .catch((err) => console.log(err));
  }, [id]);

  const BookingHandler = () => {
    // Store product details in localStorage for later use on booking page
    localStorage.setItem('productDetails', JSON.stringify(product));

    const isAuthenticated = JSON.parse(localStorage.getItem('jwt'));
    if (isAuthenticated) {
      navigate('/booking');
    } else {
      navigate('/login?redirect=Booking');
    }
  };

  // Change image function for thumbnails
  const changeImage = (src) => {
    document.getElementById('mainImage').src = src;
  };

  // Format schedule if it's an array
  const formatSchedule = (schedule) => {
    if (Array.isArray(schedule)) {
      return schedule.join(', '); // Join array items as a comma-separated string
    }
    return schedule; // Return as is if not an array
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            {/* Left Column */}
            <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                src={`http://localhost:9000/${product.product_image}`} // Dynamic main image source
                alt="Product"
                className="w-full h-auto rounded-lg shadow-md mb-4"
                id="mainImage"
              />
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                {product.product_images?.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:9000/${img}`} // Assuming product.images contains an array of image URLs
                    alt={`Thumbnail ${index + 1}`}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() => changeImage(`http://localhost:9000/${img}`)}
                  />
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">{product.product_name}</h2>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">Rs.{product.product_price}</span>
                <span className="text-gray-500 line-through">$399.99</span>
              </div>
              <p className="text-gray-700 mb-6">{product.product_description}</p>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={BookingHandler}
                  className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                  Book classes
                </button>
              </div>

              {/* Instructor and Duration */}
              <div className="mt-6">
                <p>
                  <strong>Instructor:</strong> {product.instructor}
                </p>
                <p>
                  <strong>Duration:</strong> {product.duration}
                </p>
              </div>

              {/* Key Features Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Shikshyadwar Services:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Personalized guidance for studying abroad</li>
                  <li>Expert counseling for IELTS, PTE, and SAT preparation</li>
                  <li>Access to exclusive study materials and resources</li>
                  <li>Flexible online and offline learning options</li>
                  <li>Tailored counseling for university and country selection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
