// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import philosophyImage from '../../assets/img/philosophy.png';
// // import { countries } from 'countries-list';

// // const Booking = () => {
// //   const countriesList = Object.values(countries);
// //   const navigate = useNavigate();

// //   const [shippingaddress1, setShippingAddress1] = useState('');
// //   const [city, setCity] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [country, setCountry] = useState('');
// //   const [shift, setShift] = useState('');
// //   const [classMode, setClassMode] = useState('');
// //   const [interestedInCounseling, setInterestedInCounseling] = useState(false);
// //   const [notification, setNotification] = useState('');

// //   const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

// //   const submitHandler = (e) => {
// //     e.preventDefault();
// //     if (!validatePhone(phone)) {
// //       setNotification('Please enter a valid phone number (10-15 digits).');
// //       return;
// //     }
// //     const updatedBookingInfo = {
// //       shippingaddress1,
// //       city,
// //       country,
// //       phone,
// //       shift,
// //       classMode,
// //       interestedInCounseling,
// //     };
// //     localStorage.setItem('bookingInfo', JSON.stringify(updatedBookingInfo));
// //     setNotification('Booking details saved successfully!');
// //     setTimeout(() => {
// //       navigate('/confirm');
// //     }, 1000); // Navigate after 1 second
// //   };

// //   return (
// //     <>
// //       <div style={{ position: 'relative' }}>
// //         {/* Sticky Background Image */}
// //         <div
// //           style={{
// //             backgroundImage: `url(${philosophyImage})`,
// //             height: '80vh',
// //             backgroundSize: 'cover',
// //             backgroundPosition: 'center',
// //             position: 'sticky',
// //             top: 0,
// //             zIndex: -1,
// //           }}
// //         >
// //           <h1
// //             style={{
// //               color: 'white',
// //               fontSize: '3rem',
// //               fontWeight: 'bold',
// //               textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
// //               paddingLeft: '50px',
// //               paddingTop: '20px',
// //               position: 'absolute',
// //               bottom: '20px',
// //               marginBottom: '30px',
// //             }}
// //           >
// //             ShikshyaDwar
// //           </h1>
// //         </div>

// //         {/* Notification */}
// //         {notification && (
// //           <div
// //             style={{
// //               backgroundColor: '#e0ffe6',
// //               color: '#155724',
// //               padding: '10px 20px',
// //               borderRadius: '5px',
// //               margin: '10px auto',
// //               textAlign: 'center',
// //               maxWidth: '400px',
// //             }}
// //           >
// //             {notification}
// //           </div>
// //         )}

// //         {/* Content Section */}
// //         <div
// //           style={{
// //             display: 'flex',
// //             alignItems: 'stretch',
// //             padding: '60px 40px',
// //             backgroundColor: 'rgba(255, 255, 255, 0.9)',
// //             backdropFilter: 'blur(10px)',
// //             borderRadius: '15px',
// //             marginTop: '-30px',
// //             boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
// //             gap: '20px',
// //           }}
// //         >
// //           <div style={{ flex: 1.5, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
// //             <div>
// //               <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Shikshyadwar?</h3>
// //               <ul style={{ listStyleType: 'disc', marginLeft: '20px', color: '#333' }}>
// //                 <li><strong>Experienced Instructors:</strong> Learn from certified professionals.</li>
// //                 <li><strong>Interactive Classes:</strong> Blend of theory and real-world problem-solving.</li>
// //                 <li><strong>Flexible Schedules:</strong> Morning, day, and evening classes available.</li>
// //                 <li><strong>Global Opportunities:</strong> Expert guidance for scholarships and placements.</li>
// //                 <li><strong>Mock Tests:</strong> Regular assessments to track progress.</li>
// //               </ul>
// //             </div>

// //             <div style={{ marginTop: '30px' }}>
// //               <h3 className="text-lg font-semibold text-pink-900">Benefits of Joining</h3>
// //               <ul style={{ listStyleType: 'circle', marginLeft: '20px', color: '#555' }}>
// //                 <li>Access to exclusive study materials and resources.</li>
// //                 <li>One-on-one mentoring sessions with experts.</li>
// //                 <li>Networking opportunities with alumni worldwide.</li>
// //                 <li>Dedicated support team for visa and application processes.</li>
// //               </ul>
// //             </div>

// //             <div style={{ marginTop: '30px' }}>
// //               <h4 className="text-lg font-semibold text-pink-900">Upcoming Events</h4>
// //               <ul style={{ listStyleType: 'square', marginLeft: '20px', color: '#444' }}>
// //                 <li>Mock IELTS Test - Jan 15th, 2025</li>
// //                 <li>Study Abroad Webinar - Feb 10th, 2025</li>
// //                 <li>PTE Crash Course Launch - Mar 5th, 2025</li>
// //               </ul>
// //             </div>

// //             <div style={{ marginTop: '30px' }}>
// //               <h4 className="text-lg font-semibold text-pink-900">Success Stories</h4>
// //               <p className="text-gray-700 italic">"Shikshyadwar helped me achieve my dream of studying abroad. The instructors were amazing, and the counseling sessions were incredibly helpful!"</p>
// //               <p className="text-gray-700 italic mt-4">"Thanks to their flexible classes, I could balance my job while preparing for my exams."</p>
// //             </div>

// //             <div style={{ marginTop: '30px' }}>
// //               <h4 className="text-lg font-semibold text-pink-900">Contact Information</h4>
// //               <p className="text-gray-700">📍 Shikshyadwar, Main Street, City</p>
// //               <p className="text-gray-700">📞 +1 234 567 890</p>
// //               <p className="text-gray-700">✉️ info@shikshyadwar.com</p>
// //             </div>
// //           </div>

// //           {/* Right Form Section */}
// //           <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
// //             <h2 className="text-center text-3xl font-bold text-pink-900 mb-8">Course Booking Form</h2>
// //             <form className="space-y-6" onSubmit={submitHandler}>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold">Current Address</label>
// //                 <input
// //                   type="text"
// //                   value={shippingaddress1}
// //                   onChange={(e) => setShippingAddress1(e.target.value)}
// //                   required
// //                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
// //                   placeholder="Enter your current address"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold">City</label>
// //                 <input
// //                   type="text"
// //                   value={city}
// //                   onChange={(e) => setCity(e.target.value)}
// //                   required
// //                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
// //                   placeholder="Enter your city"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold">Phone Number</label>
// //                 <input
// //                   type="number"
// //                   value={phone}
// //                   onChange={(e) => setPhone(e.target.value)}
// //                   required
// //                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
// //                   placeholder="Enter your phone number"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold">Country</label>
// //                 <input
// //                   list="countries"
// //                   value={country}
// //                   onChange={(e) => setCountry(e.target.value)}
// //                   required
// //                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
// //                   placeholder="Type or select a country"
// //                 />
// //                 <datalist id="countries">
// //                   {countriesList.map((c, i) => (
// //                     <option key={i} value={c.name} />
// //                   ))}
// //                 </datalist>
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold">Select Shift</label>
// //                 <select
// //                   value={shift}
// //                   onChange={(e) => setShift(e.target.value)}
// //                   required
// //                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
// //                 >
// //                   <option value="">Select a shift</option>
// //                   <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
// //                   <option value="day">Day (12:00 PM - 6:00 PM)</option>
// //                   <option value="evening">Evening (6:00 PM - 12:00 AM)</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold">Class Mode</label>
// //                 <select
// //                   value={classMode}
// //                   onChange={(e) => setClassMode(e.target.value)}
// //                   required
// //                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
// //                 >
// //                   <option value="">Select class mode</option>
// //                   <option value="online">Online</option>
// //                   <option value="in-office">In-office</option>
// //                 </select>
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold">Interested in Counseling</label>
// //                 <label className="inline-flex items-center mt-2">
// //                   <input
// //                     type="checkbox"
// //                     checked={interestedInCounseling}
// //                     onChange={(e) => setInterestedInCounseling(e.target.checked)}
// //                     className="form-checkbox h-5 w-5 text-pink-600"
// //                   />
// //                   <span className="ml-2">Yes, I am interested in counseling</span>
// //                 </label>
// //               </div>

// //               <button
// //                 type="submit"
// //                 className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg focus:outline-none hover:bg-pink-700 transition duration-300"
// //               >
// //                 Submit
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Booking;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import philosophyImage from '../../assets/img/p1.png';
import { countries } from 'countries-list';

const Booking = () => {
  const countriesList = Object.values(countries);
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const [formData, setFormData] = useState({
    shippingaddress1: '',
    city: '',
    phone: '',
    country: '',
    shift: '',
    classMode: '',
    interestedInCounseling: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      setNotification('Please enter a valid phone number (10-15 digits).');
      return;
    }
    localStorage.setItem('bookingInfo', JSON.stringify(formData));
    setNotification('Booking details saved successfully!');
    setTimeout(() => navigate('/confirm'), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96 mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${philosophyImage})`
          }}
        >
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl text-white font-bold mt-48">Book your class</h1>
            <p className="text-gray-200 mt-3 text-lg max-w-2xl">Take the first step towards your educational journey with ShikshyaDwar</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="fixed top-4 right-4 bg-blue-50 text-blue-800 px-6 py-3 rounded-lg shadow-lg">
          {notification}
        </div>
      )}

      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why Choose ShikshyaDwar?</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Expert Faculty</h3>
                      <p className="text-gray-600">Learn from industry professionals with years of experience</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Flexible Schedule</h3>
                      <p className="text-gray-600">Choose from multiple time slots that fit your schedule</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Global Opportunities</h3>
                      <p className="text-gray-600">Access to international education and career pathways</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Current Offers</h3>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Early bird discount - 20% off on registration
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Free counseling session with course enrollment
                  </li>
                </ul>
              </div>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              <h2 className="text-2xl font-semibold text-yellow-700 mb-6">Booking Requirement</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Current Address</label>
                  <input
                    type="text"
                    name="shippingaddress1"
                    value={formData.shippingaddress1}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
                    placeholder="Enter your address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
                    placeholder="Enter your city"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    list="countries"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
                    placeholder="Select your country"
                    required
                  />
                  <datalist id="countries">
                    {countriesList.map((c, i) => (
                      <option key={i} value={c.name} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Shift</label>
                  <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
                    required
                  >
                    <option value="">Select shift</option>
                    <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
                    <option value="day">Day (12:00 PM - 6:00 PM)</option>
                    <option value="evening">Evening (6:00 PM - 12:00 AM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class Mode</label>
                  <select
                    name="classMode"
                    value={formData.classMode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
                    required
                  >
                    <option value="">Select mode</option>
                    <option value="online">Online</option>
                    <option value="in-office">In-office</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="interestedInCounseling"
                    checked={formData.interestedInCounseling}
                    onChange={handleChange}
                    className="h-5 w-5 text-pink-700 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">I would like to receive educational counseling</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full justify-center bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Calendar, Clock, User, CheckCircle2, AlertCircle, Cloud } from 'lucide-react';

// const Booking = () => {
//   const [values, setValue] = useState({
//     name: "",
//     email: "",
//     Address: "",
//     city: "",
//     country: "",
//     phone: "",
//     totalPrice: 132, // You can adjust this as needed
//     user: "66f14c617fd72f5963c7f26d", // Example user ID
//     schedule: 10, // Example schedule
//     shift: "day", // Shift (could be 'day' or 'night')
//     classMode: "online", // Class mode ('online' or 'offline')
//     interestedInCounseling: true, // Whether the user is interested in counseling
//     error: "",
//     success: false,
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const { 
//     name, email, Address, city, country, phone, totalPrice, 
//     user, schedule, shift, classMode, interestedInCounseling, error, success 
//   } = values;

//   const navigate = useNavigate(); // Add useNavigate hook for navigation

//   const handleChange = (name) => (event) => {
//     setValue({ ...values, error: false, [name]: event.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate the form
//     if (!name || !email || !Address || !city ||  !country || !phone) {
//       setValue({ ...values, error: "Please fill in all fields" });
//       return;
//     }

//     // Set loading state
//     setIsLoading(true);
//     setValue({ ...values, error: "", success: false });

//     try {
//       // Simulating an API request with fetch
//       const response = await fetch('/api/postbooking', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           Address,
//           city,
//           country,
//           phone,
//           totalPrice,
//           user,
//           schedule,
//           shift,
//           classMode,
//           interestedInCounseling,
//         }),
//       });

//       const data = await response.json();

//       // If the response is successful
//       if (response.ok) {
//         // Store booking info in localStorage
//         localStorage.setItem('bookingInfo', JSON.stringify({
//           name,
//           email,
//           Address,
//           city,
//           country,
//           phone,
//           totalPrice,
//           user,
//           schedule,
//           shift,
//           classMode,
//           interestedInCounseling,
//         }));

//         setValue({
//           ...values,
//           name: "",
//           email: "",
//           Address: "",
//           city: "",
//           country: "",
//           phone: "",
//           totalPrice: 132,
//           user: JSON.parse(localStorage.getItem("bookingInfo"))?.user,
//           schedule: 10,
//           shift: "day",
//           classMode: "online",
//           interestedInCounseling: true,
//           error: "",
//           success: true,
//         });

//         // Navigate to the confirmation page
//         navigate('/confirm');
//       } else {
//         setValue({ ...values, error: data.message });
//       }
//     } catch (err) {
//       setValue({ ...values, error: "Something went wrong. Please try again." });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-auto bg-gradient-to-r from-blue-200 to-pink-300 relative overflow-hidden">
//       {/* Decorative Clouds */}
//       <div className="absolute inset-0 mt-3 overflow-hidden pointer-events-none">
//         <Cloud className="absolute text-white/20 top-20 left-10 w-16 h-16 animate-pulse" />
//         <Cloud className="absolute text-white/20 top-40 right-20 w-12 h-12 animate-pulse delay-300" />
//         <Cloud className="absolute text-white/20 bottom-20 left-1/4 w-20 h-20 animate-pulse delay-500" />
//       </div>

//       <div className="flex min-h-screen items-center justify-center">
//         {/* Right Side - Form */}
//         <div className="w-full lg:w-1/2 mb-48 flex items-center justify-center p-6 bg-white/90 backdrop-blur-md">
//           <div className="max-w-md w-full space-y-6">
//             {/* Header */}
//             <div className="text-center">
//               <div className="mx-auto h-14 w-14 bg-gradient-to-r from-pink-700 to-yellow-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-all duration-300 shadow-lg">
//                 <User className="h-7 w-7 text-white" />
//               </div>
//               <h2 className="mt-2 text-2xl font-extrabold text-gray-900">Complete your booking</h2>
//               <p className="text-sm text-gray-600">Fill out the details below to complete your booking</p>
//             </div>

//             {/* Alerts */}
//             {error && (
//               <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-lg flex items-center animate-fadeIn">
//                 <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             )}

//             {success && (
//               <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg flex items-center animate-fadeIn">
//                 <CheckCircle2 className="h-5 w-5 text-green-400 mr-3" />
//                 <p className="text-sm text-green-700">Booking confirmed! We will send a confirmation email.</p>
//               </div>
//             )}

//             {/* Form */}
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <div className="space-y-3">
//                 {/* Name Input */}
//                 <div className="group">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     required
//                     value={name}
//                     onChange={handleChange('name')}
//                     className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//                     placeholder="John Doe"
//                   />
//                 </div>

//                 {/* Email Input */}
//                 <div className="group">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     value={email}
//                     onChange={handleChange('email')}
//                     className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//                     placeholder="john@example.com"
//                   />
//                 </div>

//                 {/*Address*/}
//                 <div className="group">
//                   <label htmlFor="Address" className="block text-sm font-medium text-gray-700">Address</label>
//                   <input
//                     id="Address"
//                     name="Address"
//                     type="text"
//                     required
//                     value={Address}
//                     onChange={handleChange('Address')}
//                     className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//                     placeholder="Street Address"
//                   />
//                 </div>

                
//                 {/* City */}
//                 <div className="group">
//                   <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//                   <input
//                     id="city"
//                     name="city"
//                     type="text"
//                     required
//                     value={city}
//                     onChange={handleChange('city')}
//                     className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//                     placeholder="City"
//                   />
//                 </div>

                

//                 {/* Country */}
//                 <div className="group">
//                   <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
//                   <input
//                     id="country"
//                     name="country"
//                     type="text"
//                     required
//                     value={country}
//                     onChange={handleChange('country')}
//                     className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//                     placeholder="Country"
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div className="group">
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                   <input
//                     id="phone"
//                     name="phone"
//                     type="text"
//                     required
//                     value={phone}
//                     onChange={handleChange('phone')}
//                     className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//                     placeholder="Phone Number"
//                   />
//                 </div>
//                 {/* Schedule */}
// <div className="group">
//   <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">Schedule</label>
//   <input
//     id="schedule"
//     name="schedule"
//     type="number"
//     required
//     value={schedule}
//     onChange={handleChange('schedule')}
//     className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//     placeholder="Schedule (e.g., 10)"
//   />
// </div>

// {/* Shift */}
// <div className="group">
//   <label htmlFor="shift" className="block text-sm font-medium text-gray-700">Shift</label>
//   <select
//     id="shift"
//     name="shift"
//     required
//     value={shift}
//     onChange={handleChange('shift')}
//     className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//   >
//     <option value="day">Day</option>
//     <option value="night">Night</option>
//   </select>
// </div>

// {/* Class Mode */}
// <div className="group">
//   <label htmlFor="classMode" className="block text-sm font-medium text-gray-700">Class Mode</label>
//   <select
//     id="classMode"
//     name="classMode"
//     required
//     value={classMode}
//     onChange={handleChange('classMode')}
//     className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//   >
//     <option value="online">Online</option>
//     <option value="offline">Offline</option>
//   </select>
// </div>

// {/* Interested in Counseling */}
// <div className="group">
//   <label htmlFor="interestedInCounseling" className="block text-sm font-medium text-gray-700">Interested in Counseling</label>
//   <input
//     id="interestedInCounseling"
//     name="interestedInCounseling"
//     type="checkbox"
//     checked={interestedInCounseling}
//     onChange={() => setValue({ ...values, interestedInCounseling: !interestedInCounseling })}
//     className="h-4 w-4 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
//   />
// </div>


//                 {/* Submit Button */}
//                 <div className="group">
//                   <button
//                     type="submit"
//                     className={`w-full py-2 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Booking..." : "Complete Booking"}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Booking;
