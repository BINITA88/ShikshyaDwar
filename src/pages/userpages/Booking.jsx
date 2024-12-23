import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { countries } from 'countries-list';

const Booking = () => {
  const navigate = useNavigate();
  const countriesList = Object.values(countries);

  // Get shipping info from localStorage or initialize with empty values
  const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo')) || {};

  const [shippingaddress1, setShippingAddress1] = useState(bookingInfo.shippingaddress1 || '');
  const [shippingaddress2, setShippingAddress2] = useState(bookingInfo.shippingaddress2 || '');
  const [city, setCity] = useState(bookingInfo.city || '');
  const [zip, setZip] = useState(bookingInfo.zip || '');
  const [phone, setPhone] = useState(bookingInfo.phone || '');
  const [country, setCountry] = useState(bookingInfo.country || '');
  const [shift, setShift] = useState(bookingInfo.shift || ''); // New field for shift
  const [classMode, setClassMode] = useState(bookingInfo.classMode || ''); // New field for class mode
  const [interestedInCounseling, setInterestedInCounseling] = useState(bookingInfo.interestedInCounseling || false); // New field for counseling

  const submitHandler = (e) => {
    e.preventDefault();  // Prevent default form submission

    // Create shipping info object with all fields
    const updatedBookingInfo = {
      shippingaddress1,
      shippingaddress2,
      city,
      zip,
      country,
      phone,
      shift,
      classMode,
      interestedInCounseling,
    };

    // Save to localStorage
    localStorage.setItem('bookingInfo', JSON.stringify(updatedBookingInfo));

    // Redirect to confirmation page
    navigate('/confirm');
  };

  return (
    <form className="lg:p-16 p-6" onSubmit={submitHandler}>
      {/* Shipping Address 1 */}
      <div className="relative mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-600">Shipping Address 1</label>
        <input
          type="text"
          className="block w-full px-4 py-2 border rounded"
          value={shippingaddress1}
          onChange={(e) => setShippingAddress1(e.target.value)}
          required
        />
      </div>

      {/* Shipping Address 2 */}
      <div className="relative mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-600">Shipping Address 2</label>
        <input
          type="text"
          className="block w-full px-4 py-2 border rounded"
          value={shippingaddress2}
          onChange={(e) => setShippingAddress2(e.target.value)}
        />
      </div>

      {/* City */}
      <div className="relative mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-600">City</label>
        <input
          type="text"
          className="block w-full px-4 py-2 border rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      {/* Zip */}
      <div className="relative mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-600">Zip</label>
        <input
          type="number"
          className="block w-full px-4 py-2 border rounded"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
        />
      </div>

      {/* Phone Number */}
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

      {/* Country */}
      <div className="relative mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-600">Country</label>
        <input
          list="countries"
          className="block w-full px-4 py-2 border rounded"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Type or select a country"
          required
        />
        <datalist id="countries">
          {countriesList.map((c, i) => (
            <option key={i} value={c.name} />
          ))}
        </datalist>
      </div>

      {/* Shift */}
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

      {/* Class Mode */}
      <div className="relative mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-600">Class Mode</label>
        <select
          className="block w-full px-4 py-2 border rounded"
          value={classMode}
          onChange={(e) => setClassMode(e.target.value)}
          required
        >
          <option value="">Select class mode</option>
          <option value="online">Online</option>
          <option value="in-office">In-office</option>
        </select>
      </div>

      {/* Interested in Counseling */}
      <div className="relative mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-600">Interested in Counseling</label>
        <input
          type="checkbox"
          className="block w-full px-4 py-2 border rounded"
          checked={interestedInCounseling}
          onChange={(e) => setInterestedInCounseling(e.target.checked)}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded"
      >
        Continue
      </button>
    </form>
  );
};

export default Booking;
