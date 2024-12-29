import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../auth';
import { Clock, MapPin, Phone, Mail, User, Monitor, Calendar, ArrowRight, CheckCircle, Shield, CreditCard } from 'lucide-react';

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const { user } = isAuthenticated();

  if (!user) return <Navigate to="/login" />;

  const productDetails = JSON.parse(localStorage.getItem('productDetails'));
  const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));
  const totalPrice = parseFloat(productDetails.product_price); // Ensure totalPrice is directly from product_price

  const proceedToPayment = () => {
    sessionStorage.setItem('orderInfo', JSON.stringify({ totalPrice, bookingInfo }));
    navigate('/payment');
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex-shrink-0">
        <Icon className="w-6 h-6 text-yellow-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );

  const StepIndicator = ({ number, title, active }) => (
    <div className="flex items-center">
      <div className={`flex items-center justify-center w-8 h-8 rounded-full 
        ${active ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
        {number}
      </div>
      <div className="ml-3">
        <p className={`text-sm font-medium ${active ? 'text-yellow-600' : 'text-gray-500'}`}>
          {title}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Booking Confirmation</h1>
            <div className="flex items-center space-x-8">
              <StepIndicator number="1" title="Details" active={true} />
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <StepIndicator number="2" title="Payment" active={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Preview */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={
                      productDetails.product_image
                        ? `http://localhost:9000/${productDetails.product_image}`
                        : "https://via.placeholder.com/150?text=No+Image"
                    }
                    alt="Course Preview"
                    className="w-32 h-24 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = "https://via.placeholder.com/150?text=No+Image";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{productDetails.product_name}</h2>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Duration: {bookingInfo.shift}
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Monitor className="w-4 h-4 mr-1" />
                    Mode: {bookingInfo.classMode}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-600">
                    Rs.{totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <InfoItem icon={User} label="Full Name" value={user.name} />
                <InfoItem icon={Mail} label="Email Address" value={user.email} />
                <InfoItem icon={Phone} label="Phone Number" value={bookingInfo.phone} />
                <InfoItem icon={MapPin} label="Address" value={bookingInfo.shippingaddress1} />
                <InfoItem icon={MapPin} label="City" value={bookingInfo.city} />
                <InfoItem icon={MapPin} label="Country" value={bookingInfo.country} />
                <InfoItem icon={Clock} label="Preferred Shift" value={bookingInfo.shift} />
                <InfoItem icon={Monitor} label="Class Mode" value={bookingInfo.classMode} />
                <InfoItem 
                  icon={Calendar} 
                  label="Counseling Required" 
                  value={bookingInfo.interestedInCounseling ? 'Yes' : 'No'} 
                />
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Course Fee</span>
                  <span className="text-lg font-semibold text-gray-900">Rs.{totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-lg font-semibold text-gray-900">Rs.{(totalPrice * 0.18).toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-yellow-600">Rs.{(totalPrice + totalPrice * 0.18).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={proceedToPayment}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-lg font-medium py-4 rounded-lg mt-6 
                  transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Payment
              </button>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Secure payment gateway</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm">100% refund policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
