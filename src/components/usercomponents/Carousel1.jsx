import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import philosophyImage from '../../assets/img/philosophy.png';
import { countries } from 'countries-list';

const Carousel1 = () => {
  const countriesList = Object.values(countries);
  const navigate = useNavigate();

  const [shippingaddress1, setShippingAddress1] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [shift, setShift] = useState('');
  const [classMode, setClassMode] = useState('');
  const [interestedInCounseling, setInterestedInCounseling] = useState(false);
  const [notification, setNotification] = useState('');

  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setNotification('Please enter a valid phone number (10-15 digits).');
      return;
    }
    const updatedBookingInfo = {
      shippingaddress1,
      city,
      country,
      phone,
      shift,
      classMode,
      interestedInCounseling,
    };
    localStorage.setItem('bookingInfo', JSON.stringify(updatedBookingInfo));
    setNotification('Booking details saved successfully!');
    setTimeout(() => {
      navigate('/success'); // Navigate to /success page after 1 second
    }, 1000); // Navigate after 1 second
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        {/* Sticky Background Image */}
        <div
          style={{
            backgroundImage: `url(${philosophyImage})`,
            height: '80vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'sticky',
            top: 0,
            zIndex: -1,
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: '3rem',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              paddingLeft: '50px',
              paddingTop: '20px',
              position: 'absolute',
              bottom: '20px',
              marginBottom: '30px',
            }}
          >
            ShikshyaDwar
          </h1>
        </div>

        {/* Notification */}
        {notification && (
          <div
            style={{
              backgroundColor: '#e0ffe6',
              color: '#155724',
              padding: '10px 20px',
              borderRadius: '5px',
              margin: '10px auto',
              textAlign: 'center',
              maxWidth: '400px',
            }}
          >
            {notification}
          </div>
        )}

        {/* Content Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            padding: '60px 40px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            marginTop: '-30px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            gap: '20px',
          }}
        >
          <div style={{ flex: 1.5, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Shikshyadwar?</h3>
              <ul style={{ listStyleType: 'disc', marginLeft: '20px', color: '#333' }}>
                <li><strong>Experienced Instructors:</strong> Learn from certified professionals.</li>
                <li><strong>Interactive Classes:</strong> Blend of theory and real-world problem-solving.</li>
                <li><strong>Flexible Schedules:</strong> Morning, day, and evening classes available.</li>
                <li><strong>Global Opportunities:</strong> Expert guidance for scholarships and placements.</li>
                <li><strong>Mock Tests:</strong> Regular assessments to track progress.</li>
              </ul>
            </div>

            <div style={{ marginTop: '30px' }}>
              <h3 className="text-lg font-semibold text-pink-900">Benefits of Joining</h3>
              <ul style={{ listStyleType: 'circle', marginLeft: '20px', color: '#555' }}>
                <li>Access to exclusive study materials and resources.</li>
                <li>One-on-one mentoring sessions with experts.</li>
                <li>Networking opportunities with alumni worldwide.</li>
                <li>Dedicated support team for visa and application processes.</li>
              </ul>
            </div>

            <div style={{ marginTop: '30px' }}>
              <h4 className="text-lg font-semibold text-pink-900">Upcoming Events</h4>
              <ul style={{ listStyleType: 'square', marginLeft: '20px', color: '#444' }}>
                <li>Mock IELTS Test - Jan 15th, 2025</li>
                <li>Study Abroad Webinar - Feb 10th, 2025</li>
                <li>PTE Crash Course Launch - Mar 5th, 2025</li>
              </ul>
            </div>

            <div style={{ marginTop: '30px' }}>
              <h4 className="text-lg font-semibold text-pink-900">Success Stories</h4>
              <p className="text-gray-700 italic">"Shikshyadwar helped me achieve my dream of studying abroad. The instructors were amazing, and the counseling sessions were incredibly helpful!"</p>
              <p className="text-gray-700 italic mt-4">"Thanks to their flexible classes, I could balance my job while preparing for my exams."</p>
            </div>

            <div style={{ marginTop: '30px' }}>
              <h4 className="text-lg font-semibold text-pink-900">Contact Information</h4>
              <p className="text-gray-700">📍 Shikshyadwar, Main Street, City</p>
              <p className="text-gray-700">📞 +1 234 567 890</p>
              <p className="text-gray-700">✉️ info@shikshyadwar.com</p>
            </div>
          </div>

          {/* Right Form Section */}
          <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="text-center text-3xl font-bold text-pink-900 mb-8">Counseling Form</h2>
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label className="block text-gray-700 font-semibold">Current Address</label>
                <input
                  type="text"
                  value={shippingaddress1}
                  onChange={(e) => setShippingAddress1(e.target.value)}
                  required
                  className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                  placeholder="Enter your current address"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                  placeholder="Enter your city"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Phone Number</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Country</label>
                <input
                  list="countries"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                  placeholder="Type or select a country"
                />
                <datalist id="countries">
                  {countriesList.map((c, i) => (
                    <option key={i} value={c.name} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Select Shift</label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  required
                  className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                >
                  <option value="">Choose a shift</option>
                  <option value="morning">Morning</option>
                  <option value="day">Day</option>
                  <option value="evening">Evening</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Coundelling Mode</label>
                <select
                  value={classMode}
                  onChange={(e) => setClassMode(e.target.value)}
                  required
                  className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                >
                  <option value="">Choose counseling mode</option>
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 mt-6 text-lg bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel1;
