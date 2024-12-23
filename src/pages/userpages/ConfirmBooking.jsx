import React from 'react';
import { isAuthenticated } from '../../auth';
import { Navigate, useNavigate } from 'react-router-dom';

const ConfirmBooking = () => {
  const navigate = useNavigate();

  // Fetch product and booking details from localStorage
  const productDetails = JSON.parse(localStorage.getItem('productDetails'));
  const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));
  const { user } = isAuthenticated();

  // Calculate total price
  const totalPrice = productDetails.quantity * productDetails.product_price;

  const proceedToPayment = () => {
    const data = {
      totalPrice,
      bookingInfo,
    };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/payment');
  };

  return (
    <>
      <div className="container mx-auto my-8 px-4">
        <div className="flex flex-wrap justify-evenly">
          {/* Booking and User Info */}
          <div className="w-full lg:w-8/12 bg-white shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Booking and User Info</h2>
            <div className="mb-6">
              <p>
                <b>Name:</b> <span className="text-gray-500">{user.name}</span>
              </p>
              <p>
                <b>Email:</b> <span className="text-gray-500">{user.email}</span>
              </p>
            </div>

            {/* Booking Details */}
  
            <div className="space-y-2">
              <p>
                <b>Address :</b> <span className="text-gray-500">{shippingInfo.shippingaddress1}</span>
              </p>
              
              <p>
                <b>City:</b> <span className="text-gray-500">{shippingInfo.city}</span>
              </p>
              <p>
              
              </p>
              <p>
                <b>Phone:</b> <span className="text-gray-500">{shippingInfo.phone}</span>
              </p>
              <p>
                <b>Country:</b> <span className="text-gray-500">{shippingInfo.country}</span>
              </p>
              <p>
                <b>Shift:</b> <span className="text-gray-500">{shippingInfo.shift}</span>
              </p>
              <p>
                <b>Class Mode:</b> <span className="text-gray-500">{shippingInfo.classMode}</span>
              </p>
              <p>
                <b>Interested in Counseling:</b>{' '}
                <span className="text-gray-500">
                  {shippingInfo.interestedInCounseling ? 'Yes' : 'No'}
                </span>
              </p>
            </div>
          </div>

          {/* Product Info and Order Summary */}
          <div className="w-full lg:w-3/12 bg-white shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="flex items-center mb-6 border-b pb-4">
              <div className="w-1/3">
                <img
                  src={`http://localhost:9000/${productDetails.product_image}`}
                  alt={productDetails.product_name}
                  className="w-full h-auto"
                />
              </div>
              <div className="w-2/3 px-4">
                <p className="text-gray-500">{productDetails.product_name}</p>
                <p>
           
                </p>
                <p className="text-blue-600 text-lg font-bold">
                  Rs. {productDetails.product_price}
                </p>
              </div>
            </div>
            <hr className="my-6" />
            <p className="mb-4">
              <b>Total Price:</b> Rs <span>{productDetails.product_price}</span>
            </p>
            <button
              className="w-full bg-yellow-500 text-white py-2 px-4 hover:bg-yellow-700"
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

export default ConfirmBooking;
