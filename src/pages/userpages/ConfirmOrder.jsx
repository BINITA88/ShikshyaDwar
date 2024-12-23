import React from 'react';
import { isAuthenticated } from '../../auth';
import { Navigate, useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  
  // Fetch product details and shipping information from localStorage
  const productDetails = JSON.parse(localStorage.getItem('productDetails'));
  const shippingInfo = JSON.parse(localStorage.getItem('shippinginfo'));
  const { user } = isAuthenticated();
  
  // Calculate total price from the product details
  const totalPrice = productDetails.quantity * productDetails.product_price;  // Calculate price based on quantity

  const proceedToPayment = () => {
    const data = {
      totalPrice
    };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/payment');
  };

  return (
    <>
      <div className="container mx-auto my-8 px-4">
        <div className='flex flex-wrap justify-evenly'>
          <div className='w-full lg:w-8/12 bg-white shadow-md p-6 mb-6'>
            <h2>Booking class Info</h2>
            <div className='max-w-md max-auto'>
              <div className='mb-4'>
                <b>Name:</b>
                <span className='text-gray-500'>{user.name}</span>
              </div>
              <div className='mb-4'>
                <b>Email:</b>
                <span className='text-gray-500'>{user.email}</span>
              </div>
            </div>

            <hr className="my-6" />

            <h2 className="text-center text-xl text-gray-600 font-medium mb-6">Your Book course</h2>
            <div className="flex item-center mb-6 border-b pb-4">
              <div className="w-1/3">
                <img src={`http://localhost:9000/${productDetails.product_image}`} alt={productDetails.product_name} className='w-full h-auto' />
              </div>
              <div className='w-1/3 px-4'>
                <p className='text-gray-500'>{productDetails.product_name}</p>
                <div className="w-1/3 text-right">
                  <span className='text-blue-600 text-lg'>
                    Rs.{productDetails.product_price} 
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/12 bg-white shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <hr className='mb-6' />
          
            <p className='mb-4'>
              Total Price: Rs <span>{productDetails.product_price} </span>
            </p>

            <hr className='my-6' />
            <button 
              className='w-full bg-yellow-500 text-white py-2 px-4 hover:bg-yellow-700'
              onClick={proceedToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
