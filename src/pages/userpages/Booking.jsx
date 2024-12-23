import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { countries } from 'countries-list';

const Booking = () => {
  const navigate = useNavigate();
  const countriesList = Object.values(countries);

  // Check if shipping info is in local storage
  const shippinginfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};

  const [shippingaddress1, setshippingaddress1] = useState(shippinginfo.shippingaddress1 || '');
  const [phone, setPhone] = useState(shippinginfo.phone || '');
  const [country, setCountry] = useState(shippinginfo.country || '');
  const [shift, setShift] = useState('');
  const [classMode, setClassMode] = useState('');
  const [interestedInCounseling, setInterestedInCounseling] = useState(false); // State for counseling checkbox

  // Submit handler to save shipping info and redirect
  const submitHandler = (e) => {
    e.preventDefault();
    const shippingInfo = {
      shippingaddress1,
      phone,
      country,
      shift,
      classMode,
      interestedInCounseling, // Include counseling interest in the shipping info
    };
    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    navigate('/confirm');
  };

  return (
    <>
      <form className="lg:p-16 p-6">
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Address</label>
          <input
            type="text"
            className="block w-full px-4 py-2 border rounded"
            value={shippingaddress1}
            onChange={(e) => setshippingaddress1(e.target.value)}
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Phone Number</label>
          <input
            type="number"
            className="block w-full px-4 py-2 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Country</label>
          <select
            className="block w-full px-4 py-2 border rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            {countriesList.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Select Shift</label>
          <select
            className="block w-full px-4 py-2 border rounded"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            required
          >
            <option value="">Select a shift</option>
            <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
            <option value="day">Day (12:00 PM - 6:00 PM)</option>
            <option value="evening">Evening (6:00 PM - 12:00 AM)</option>
          </select>
        </div>

        {/* Class Mode Radio Buttons */}
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Mode of Class</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="classMode"
                value="online"
                checked={classMode === 'online'}
                onChange={(e) => setClassMode(e.target.value)}
                className="mr-2"
              />
              Online
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="classMode"
                value="in-office"
                checked={classMode === 'in-office'}
                onChange={(e) => setClassMode(e.target.value)}
                className="mr-2"
              />
              In-office
            </label>
            
          </div>
        </div>

        {/* Interested in Counseling Checkbox */}
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Interested in Counseling</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={interestedInCounseling}
              onChange={(e) => setInterestedInCounseling(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">Yes, I am interested in counseling</span>
          </div>
        </div>

        <button 
          type="submit"
          onClick={submitHandler}
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded"
        >
          Continue
        </button>
      </form>
    </>
  );
};

export default Booking;
