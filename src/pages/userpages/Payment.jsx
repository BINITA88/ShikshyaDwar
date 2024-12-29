import React from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { isAuthenticated } from '../../auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ShieldCheck, Clock, ArrowLeft, CheckCircle } from 'lucide-react';

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      backgroundColor: 'white',
    },
    invalid: {
      color: '#9e2146',
      iconColor: '#9e2146',
    },
  },
};

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { user } = isAuthenticated();
  const productDetails = JSON.parse(localStorage.getItem('productDetails')) || {};
  const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo')) || {};

  const productPrice = productDetails.product_price || 0;
  const tax = productPrice * 0.18;
  const totalPriceWithTax = (productPrice + tax).toFixed(2);

  const handleBackClick = () => {
    navigate('/confirm-booking');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay-btn').disabled = true;

    try {
      const order = {
        orderItems: productDetails,
        shippingAddress1: bookingInfo.shippingAddress1,
        shippingAddress2: bookingInfo.shippingAddress2,
        city: bookingInfo.city,
        zip: bookingInfo.zip,
        phone: bookingInfo.phone,
        country: bookingInfo.country,
        user: user._id,
        paymentInfo: {
          id: 'test_payment_id',
          status: 'succeeded',
        },
      };

      await localStorage.removeItem('productDetails');
      toast.success('Payment successful!');
      navigate('/success');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      document.querySelector('#pay-btn').disabled = false;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <ToastContainer theme="colored" position="top-center" />
      
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button
              onClick={handleBackClick}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-pink-800" />
              <span className="text-sm text-gray-600">Secure Payment</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="h-8 w-8 text-pink-800 mb-2" />
              <h4 className="font-medium text-gray-900 text-sm">Secure Payment</h4>
            </div>
            <div className="flex flex-col items-center text-center">
              <Lock className="h-8 w-8 text-pink-800 mb-2" />
              <h4 className="font-medium text-gray-900 text-sm">SSL Protected</h4>
            </div>
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-8 w-8 text-pink-800 mb-2" />
              <h4 className="font-medium text-gray-900 text-sm">Guaranteed Safe</h4>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-pink-800 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
                <p className="text-pink-100 mt-1">Enter your card details below</p>
              </div>
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            <div className="bg-blue-50 rounded-xl p-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount to Pay:</span>
                <span className="text-2xl font-bold text-pink-800">Rs.{totalPriceWithTax}</span>
              </div>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <CreditCard className="h-4 w-4 mr-2 text-pink-800" />
                    Card Number
                  </label>
                  <div className="h-14 px-4 border border-gray-300 rounded-xl focus-within:border-pink-800 focus-within:ring-1 focus-within:ring-pink-800 transition-all duration-200">
                    <CardNumberElement options={cardElementOptions} className="h-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Clock className="h-4 w-4 mr-2 text-pink-800" />
                      Expiry Date
                    </label>
                    <div className="h-14 px-4 border border-gray-300 rounded-xl focus-within:border-pink-800 focus-within:ring-1 focus-within:ring-pink-800 transition-all duration-200">
                      <CardExpiryElement options={cardElementOptions} className="h-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Lock className="h-4 w-4 mr-2 text-pink-800" />
                      CVC
                    </label>
                    <div className="h-14 px-4 border border-gray-300 rounded-xl focus-within:border-pink-800 focus-within:ring-1 focus-within:ring-pink-800 transition-all duration-200">
                      <CardCvcElement options={cardElementOptions} className="h-full" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                id="pay-btn"
                className="w-full bg-yellow-700 text-white py-4 px-6 rounded-xl font-medium text-lg hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Lock className="h-5 w-5" />
                <span>Pay Rs.{totalPriceWithTax}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;