import React, { useState } from 'react';
import axios from 'axios';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { isAuthenticated } from '../../auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ShieldCheck, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    document.querySelector('#pay-btn').disabled = true;

    if (!stripe || !elements) {
      toast.error('Stripe is not loaded properly!');
      document.querySelector('#pay-btn').disabled = false;
      setLoading(false);
      return;
    }

    try {
      console.log("🚀 Sending payment request to backend...");

      const { data } = await axios.post('/api/process/payment', {
        amount: Math.round(totalPriceWithTax * 100), // Convert to paisa (Stripe expects smallest currency unit)
      });

      console.log("✅ Payment Intent Created:", data);

      // Confirm card payment using Stripe
      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name: user?.name, email: user?.email }
        }
      });

      if (result.error) {
        console.error("❌ Payment Failed:", result.error.message);
        toast.error(result.error.message);
        document.querySelector('#pay-btn').disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("🎉 Payment Successful!");
          localStorage.removeItem('productDetails'); // Clear local storage
          navigate("/success");
        } else {
          toast.error("⚠ Payment Not Completed. Please try again.");
        }
      }
    } catch (error) {
      console.error("❌ Payment Error:", error);
      toast.error("Server Error! Check backend logs.");
      document.querySelector('#pay-btn').disabled = false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <ToastContainer theme="colored" position="top-center" />

      {/* Navbar */}
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

      {/* Payment Form */}
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
            <h2 className="text-2xl font-bold text-white">Complete Payment</h2>
            <p className="text-pink-100 mt-1">Enter your card details below</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <CreditCard className="h-4 w-4 mr-2 text-pink-800" />
                    Card Number
                  </label>
                  <div className="h-14 px-4 border border-gray-300 rounded-xl">
                    <CardNumberElement options={cardElementOptions} className="h-full" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Clock className="h-4 w-4 mr-2 text-pink-800" />
                      Expiry Date
                    </label>
                    <div className="h-14 px-4 border border-gray-300 rounded-xl">
                      <CardExpiryElement options={cardElementOptions} className="h-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Lock className="h-4 w-4 mr-2 text-pink-800" />
                      CVC
                    </label>
                    <div className="h-14 px-4 border border-gray-300 rounded-xl">
                      <CardCvcElement options={cardElementOptions} className="h-full" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                id="pay-btn"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-medium text-lg text-white transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-700 hover:bg-yellow-800"
                }`}
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
