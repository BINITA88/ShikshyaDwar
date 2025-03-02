


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import philosophyImage from '../../assets/img/p1.png';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';

const Booking = () => {
  const navigate = useNavigate();

  // Function to get user info from JWT stored in localStorage
  const getUserFromToken = () => {
    const token = localStorage.getItem('jwt'); // Ensure this is the correct key
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode JWT
        return {
          name: decoded.name || '',
          email: decoded.email || '',
          userId: decoded._id || '', // Ensure this is correct based on your token structure
        };
      } catch (err) {
        console.error("Invalid Token", err);
        return { name: '', email: '', userId: '' };
      }
    }
    return { name: '', email: '', userId: '' };
  };

  // Get user details from JWT
  const userData = getUserFromToken();

  const [values, setValue] = useState({
    name: userData.name,
    email: userData.email,
    Address: "",
    city: "",
    country: "",
    phone: "",
    totalPrice: 132,
    user: userData.userId, // Store user ID for backend reference
    schedule: 10,
    shift: "day",
    classMode: "online",
    interestedInCounseling: true,
    error: "",
    success: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { name, email, Address, city, country, phone, shift, classMode, error } = values;

  const handleChange = (field) => (event) => {
    setValue({ ...values, error: false, [field]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Address || !city || !country || !phone) {
      setValue({ ...values, error: "Please fill in all fields" });
      return;
    }

    setIsLoading(true);
    setValue({ ...values, error: "", success: false });

    try {
      const response = await fetch('/api/postbooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('bookingInfo', JSON.stringify(values));
        setValue({
          ...values,
          Address: "",
          city: "",
          country: "",
          phone: "",
          error: "",
          success: true,
        });
        navigate('/confirm');
      } else {
        setValue({ ...values, error: data.message });
      }
    } catch (err) {
      setValue({ ...values, error: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Image Section */}
      <div className="relative h-96 mb-8">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${philosophyImage})` }}>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl text-white font-bold mt-48">Book your class</h1>
            <p className="text-gray-200 mt-3 text-lg max-w-2xl">Take the first step towards your educational journey with ShikshyaDwar</p>
          </div>
        </div>
      </div>

      {/* Booking Container */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto  p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Side - Features */}
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-gray-800">Why Choose ShikshyaDwar?</h2>
              <div className="space-y-6">
                {[
                  { icon: <CheckCircle2 className="text-blue-600" />, title: "Expert Faculty", desc: "Learn from industry professionals with years of experience" },
                  { icon: <Clock className="text-green-600" />, title: "Flexible Schedule", desc: "Choose from multiple time slots that fit your schedule" },
                  { icon: <Calendar className="text-purple-600" />, title: "Global Opportunities", desc: "Access to international education and career pathways" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">{feature.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Offers */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900">Current Offers</h3>
                <ul className="space-y-3 text-blue-800">
                  <li>🔹 Early bird discount - 20% off on registration</li>
                  <li>🔹 Free counseling session with course enrollment</li>
                </ul>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-yellow-700">Booking Requirement</h2>
            
            {/* User Info (Read-Only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" value={name} disabled className="w-full px-4 py-2 rounded-lg bg-gray-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" value={email} disabled className="w-full px-4 py-2 rounded-lg bg-gray-200" />
              </div> */}
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Address</label>
                <input type="text" value={Address} onChange={handleChange("Address")} className="w-full px-4 py-2 rounded-lg bg-gray-100" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" value={city} onChange={handleChange("city")} className="w-full px-4 py-2 rounded-lg bg-gray-100" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" value={phone} onChange={handleChange("phone")} className="w-full px-4 py-2 rounded-lg bg-gray-100" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" value={country} onChange={handleChange("country")} className="w-full px-4 py-2 rounded-lg bg-gray-100" required />
              </div>
            </div>

            {/* Shift and Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Shift</label>
                <select value={shift} onChange={handleChange("shift")} className="w-full px-4 py-2 rounded-lg bg-gray-100">
                  <option value="day">Day</option>
                  <option value="night">Night</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Class Mode</label>
                <select value={classMode} onChange={handleChange("classMode")} className="w-full px-4 py-2 rounded-lg bg-gray-100">
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-pink-700 text-white py-3 rounded-lg font-medium hover:bg-blue-700">Complete Booking</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
