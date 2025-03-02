// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import philosophyImage from '../../assets/img/philosophy.png';
// import { countries } from 'countries-list';

// const Carousel1 = () => {
//   const countriesList = Object.values(countries);
//   const navigate = useNavigate();

//   const [shippingaddress1, setShippingAddress1] = useState('');
//   const [city, setCity] = useState('');
//   const [phone, setPhone] = useState('');
//   const [country, setCountry] = useState('');
//   const [shift, setShift] = useState('');
//   const [classMode, setClassMode] = useState('');
//   const [interestedInCounseling, setInterestedInCounseling] = useState(false);
//   const [notification, setNotification] = useState('');

//   const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!validatePhone(phone)) {
//       setNotification('Please enter a valid phone number (10-15 digits).');
//       return;
//     }
//     const updatedBookingInfo = {
//       shippingaddress1,
//       city,
//       country,
//       phone,
//       shift,
//       classMode,
//       interestedInCounseling,
//     };
//     localStorage.setItem('bookingInfo', JSON.stringify(updatedBookingInfo));
//     setNotification('Booking details saved successfully!');
//     setTimeout(() => {
//       navigate('/success'); // Navigate to /success page after 1 second
//     }, 1000); // Navigate after 1 second
//   };

//   return (
//     <>
//       <div style={{ position: 'relative' }}>
//         {/* Sticky Background Image */}
//         <div
//           style={{
//             backgroundImage: `url(${philosophyImage})`,
//             height: '80vh',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             position: 'sticky',
//             top: 0,
//             zIndex: -1,
//           }}
//         >
//           <h1
//             style={{
//               color: 'white',
//               fontSize: '3rem',
//               fontWeight: 'bold',
//               textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
//               paddingLeft: '50px',
//               paddingTop: '20px',
//               position: 'absolute',
//               bottom: '20px',
//               marginBottom: '30px',
//             }}
//           >
//             ShikshyaDwar
//           </h1>
//         </div>

//         {/* Notification */}
//         {notification && (
//           <div
//             style={{
//               backgroundColor: '#e0ffe6',
//               color: '#155724',
//               padding: '10px 20px',
//               borderRadius: '5px',
//               margin: '10px auto',
//               textAlign: 'center',
//               maxWidth: '400px',
//             }}
//           >
//             {notification}
//           </div>
//         )}

//         {/* Content Section */}
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'stretch',
//             padding: '60px 40px',
//             backgroundColor: 'rgba(255, 255, 255, 0.9)',
//             backdropFilter: 'blur(10px)',
//             borderRadius: '15px',
//             marginTop: '-30px',
//             boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
//             gap: '20px',
//           }}
//         >
//           <div style={{ flex: 1.5, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Shikshyadwar?</h3>
//               <ul style={{ listStyleType: 'disc', marginLeft: '20px', color: '#333' }}>
//                 <li><strong>Experienced Instructors:</strong> Learn from certified professionals.</li>
//                 <li><strong>Interactive Classes:</strong> Blend of theory and real-world problem-solving.</li>
//                 <li><strong>Flexible Schedules:</strong> Morning, day, and evening classes available.</li>
//                 <li><strong>Global Opportunities:</strong> Expert guidance for scholarships and placements.</li>
//                 <li><strong>Mock Tests:</strong> Regular assessments to track progress.</li>
//               </ul>
//             </div>

//             <div style={{ marginTop: '30px' }}>
//               <h3 className="text-lg font-semibold text-pink-900">Benefits of Joining</h3>
//               <ul style={{ listStyleType: 'circle', marginLeft: '20px', color: '#555' }}>
//                 <li>Access to exclusive study materials and resources.</li>
//                 <li>One-on-one mentoring sessions with experts.</li>
//                 <li>Networking opportunities with alumni worldwide.</li>
//                 <li>Dedicated support team for visa and application processes.</li>
//               </ul>
//             </div>

//             <div style={{ marginTop: '30px' }}>
//               <h4 className="text-lg font-semibold text-pink-900">Upcoming Events</h4>
//               <ul style={{ listStyleType: 'square', marginLeft: '20px', color: '#444' }}>
//                 <li>Mock IELTS Test - Jan 15th, 2025</li>
//                 <li>Study Abroad Webinar - Feb 10th, 2025</li>
//                 <li>PTE Crash Course Launch - Mar 5th, 2025</li>
//               </ul>
//             </div>

//             <div style={{ marginTop: '30px' }}>
//               <h4 className="text-lg font-semibold text-pink-900">Success Stories</h4>
//               <p className="text-gray-700 italic">"Shikshyadwar helped me achieve my dream of studying abroad. The instructors were amazing, and the counseling sessions were incredibly helpful!"</p>
//               <p className="text-gray-700 italic mt-4">"Thanks to their flexible classes, I could balance my job while preparing for my exams."</p>
//             </div>

//             <div style={{ marginTop: '30px' }}>
//               <h4 className="text-lg font-semibold text-pink-900">Contact Information</h4>
//               <p className="text-gray-700">📍 Shikshyadwar, Main Street, City</p>
//               <p className="text-gray-700">📞 +1 234 567 890</p>
//               <p className="text-gray-700">✉️ info@shikshyadwar.com</p>
//             </div>
//           </div>

//           {/* Right Form Section */}
//           <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//             <h2 className="text-center text-3xl font-bold text-pink-900 mb-8">Counseling Form</h2>
//             <form className="space-y-6" onSubmit={submitHandler}>
//               <div>
//                 <label className="block text-gray-700 font-semibold">Current Address</label>
//                 <input
//                   type="text"
//                   value={shippingaddress1}
//                   onChange={(e) => setShippingAddress1(e.target.value)}
//                   required
//                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
//                   placeholder="Enter your current address"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold">City</label>
//                 <input
//                   type="text"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   required
//                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
//                   placeholder="Enter your city"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold">Phone Number</label>
//                 <input
//                   type="number"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   required
//                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
//                   placeholder="Enter your phone number"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold">Country</label>
//                 <input
//                   list="countries"
//                   value={country}
//                   onChange={(e) => setCountry(e.target.value)}
//                   required
//                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
//                   placeholder="Type or select a country"
//                 />
//                 <datalist id="countries">
//                   {countriesList.map((c, i) => (
//                     <option key={i} value={c.name} />
//                   ))}
//                 </datalist>
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold">Select Shift</label>
//                 <select
//                   value={shift}
//                   onChange={(e) => setShift(e.target.value)}
//                   required
//                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
//                 >
//                   <option value="">Choose a shift</option>
//                   <option value="morning">Morning</option>
//                   <option value="day">Day</option>
//                   <option value="evening">Evening</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold">Coundelling Mode</label>
//                 <select
//                   value={classMode}
//                   onChange={(e) => setClassMode(e.target.value)}
//                   required
//                   className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
//                 >
//                   <option value="">Choose counseling mode</option>
//                   <option value="offline">Offline</option>
//                   <option value="online">Online</option>
//                 </select>
//               </div>
              
//               <button
//                 type="submit"
//                 className="w-full py-3 mt-6 text-lg bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-200"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


// import React, { useState } from 'react';

// const Carousel1 = () => {
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [bookedSeats, setBookedSeats] = useState([2, 5, 9]); // Example booked seats

//   const handleSeatSelect = (seatNumber) => {
//     setSelectedSeat(seatNumber);
//   };

//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//   };

//   const handleTimeSelect = (time) => {
//     setSelectedTime(time);
//   };

//   const handleBooking = () => {
//     if (selectedSeat !== null && selectedDate && selectedTime) {
//       alert(`You have booked seat ${selectedSeat} for ${selectedDate} at ${selectedTime}`);
//       setBookedSeats([...bookedSeats, selectedSeat]); // Mark seat as booked
//     } else {
//       alert("Please select seat, date, and time to book.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-blue-200">
//       <div className="bg-white shadow-lg p-6 rounded-lg w-96">
//         <h2 className="text-center text-2xl font-semibold mb-4">Test Prep Exam Booking</h2>

//         {/* Seat Selection */}
//         <div className="mb-4">
//           <h3 className="text-lg font-medium mb-2">Select Your Seat</h3>
//           <div className="grid grid-cols-5 gap-2 mb-2">
//             {Array.from({ length: 20 }, (_, index) => (
//               <div
//                 key={index}
//                 className={`w-8 h-8 border rounded flex justify-center items-center cursor-pointer ${
//                   bookedSeats.includes(index)
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : selectedSeat === index
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-white'
//                 }`}
//                 onClick={() => !bookedSeats.includes(index) && handleSeatSelect(index)}
//               >
//                 {index + 1}
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-blue-500">Selected</span>
//             <span className="text-gray-400">Booked</span>
//           </div>
//         </div>

//         {/* Date Selection */}
//         <div className="mb-4">
//           <h3 className="text-lg font-medium mb-2">Select Date</h3>
//           <div className="flex space-x-2">
//             {['Mon 12', 'Tue 13', 'Wed 14'].map((date) => (
//               <button
//                 key={date}
//                 className={`px-3 py-2 rounded ${
//                   selectedDate === date ? 'bg-blue-500 text-white' : 'bg-gray-200'
//                 }`}
//                 onClick={() => handleDateSelect(date)}
//               >
//                 {date}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Time Selection */}
//         <div className="mb-4">
//           <h3 className="text-lg font-medium mb-2">Select Time</h3>
//           <div className="flex space-x-2">
//             {['10:00 AM', '2:00 PM', '4:00 PM'].map((time) => (
//               <button
//                 key={time}
//                 className={`px-3 py-2 rounded ${
//                   selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-200'
//                 }`}
//                 onClick={() => handleTimeSelect(time)}
//               >
//                 {time}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Booking Button */}
//         <div className="text-center">
//           <button
//             className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full"
//             onClick={handleBooking}
//             disabled={selectedSeat === null || selectedDate === null || selectedTime === null}
//           >
//             Book Seat
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousel1;



// import React from 'react';

// const Carousel1 = () => {
//   return (
//     <div className="evaluation-service">
//       {/* Video Section */}
//       <div className="evaluation-service__video-wrap">
//         <video controls controlsList="nodownload" poster="https://ieltsonlinetests.com/sites/default/files/landing-page/Services/IELTS-Writing-Examiner-Evaluation.jpg">
//           <source src="https://vod.intergreat.com/e0b0f324b86671efbfb236a5e8aa0102/7cc077a8ce7f43df992f4a3012001078-c236613020eaa3914c6d9de405792a03-hd.mp4" type="video/mp4" />
//           Your browser does not support HTML video.
//         </video>
//       </div>

//       {/* Service Items */}
//       <div className="evaluation-service__contents flex-grid">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"> {/* Responsive grid */}
//           <div className="evaluation-service__item">
//             <img
//               alt="Real IELTS Test Experience"
//               className="evaluation-service__item-img mx-auto"
//               src="/themes/iot/images/pages/writing-evaluation/evalution-service-icon-1.svg"
//             />
//             <h6 className="evaluation-service__item-title text-center">Real IELTS test experience</h6>
//             <div className="evaluation-service__item-desc text-gray-600 text-center">
//               Take our real IELTS test and your Writing will be marked by our examiners with years of experience with IELTS tests.
//             </div>
//           </div>
//           <div className="evaluation-service__item">
//             <img
//               alt="Detailed Feedbacks"
//               className="evaluation-service__item-img mx-auto"
//               src="/themes/iot/images/pages/writing-evaluation/evalution-service-icon-2.svg"
//             />
//             <h6 className="evaluation-service__item-title text-center">Detailed feedbacks</h6>
//             <div className="evaluation-service__item-desc text-gray-600 text-center">
//               Receive detailed feedback and accurate band score of your IELTS writing ability.
//             </div>
//           </div>
//           <div className="evaluation-service__item">
//             <img
//               alt="Quick Response"
//               className="evaluation-service__item-img mx-auto"
//               src="/themes/iot/images/pages/writing-evaluation/evalution-service-icon-3.svg"
//             />
//             <h6 className="evaluation-service__item-title text-center">Quick response</h6>
//             <div className="evaluation-service__item-desc text-gray-600 text-center">
//               No time to waste! Obtain your IELTS writing recording assessment and evaluation from our examiners in just 48 hours.
//             </div>
//           </div>
//           <div className="evaluation-service__item">
//             <img
//               alt="Boost Score"
//               className="evaluation-service__item-img mx-auto"
//               src="/themes/iot/images/pages/writing-evaluation/evalution-service-icon-4.svg"
//             />
//             <h6 className="evaluation-service__item-title text-center">Boost score in short time</h6>
//             <div className="evaluation-service__item-desc text-gray-600 text-center">
//               We help to increase your IELTS Writing band score by 0.5 - 1 in short time with suggestions for improvement.
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousel1;




// import React from 'react';

// const Carousel1 = () => {
//   return (
//     <div className="w-full max-w-6xl mx-auto p-4">
//       {/* Video Section with correct background */}
//       <div className="w-full aspect-video mb-8 bg-[#234B65] rounded-lg overflow-hidden">
//         <div className="relative w-full h-full flex items-center justify-center">
//           {/* Logo */}
//           <div className="absolute flex items-center justify-center">
//             <div className="relative w-28 h-28">
//               <div className="absolute w-full h-full flex">
//                 <div className="w-1/2 bg-[#FFA666]"></div>
//                 <div className="w-1/2 bg-[#E17676]"></div>
//               </div>
//               <div className="absolute inset-2 bg-white rounded-full overflow-hidden">
//                 <img 
//                   src="/api/placeholder/100/100"
//                   alt="Examiner"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//           {/* Title */}
//           <div className="absolute bottom-12 text-center text-white">
//             <h1 className="text-3xl font-bold mb-1">IELTS Writing</h1>
//             <p className="text-xl">Examiner Evaluation</p>
//           </div>
//         </div>
//       </div>

//       {/* Service Items Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {/* Real IELTS Test Experience */}
//         <div className="p-6 bg-white rounded-lg border border-[#9f2c2c] hover:shadow-lg transition-shadow">
//           <div className="flex flex-col items-center text-center">
//             <div className="w-16 h-16 mb-4">
//               <svg viewBox="0 0 24 24" fill="none" stroke="#FFA666" strokeWidth="2">
//                 <rect x="4" y="4" width="16" height="16" rx="2"/>
//                 <path d="M12 8v8m-4-4h8"/>
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-[#234B65] mb-2">Real IELTS test experience</h3>
//             <p className="text-gray-600">Take our real IELTS test and your Writing will be marked by our examiners with years of experience with IELTS tests.</p>
//           </div>
//         </div>

//         {/* Detailed Feedbacks */}
//         <div className="p-6 bg-white rounded-lg border border-[#FFA666] hover:shadow-lg transition-shadow">
//           <div className="flex flex-col items-center text-center">
//             <div className="w-16 h-16 mb-4">
//               <svg viewBox="0 0 24 24" fill="none" stroke="#FFA666" strokeWidth="2">
//                 <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
//                 <rect x="8" y="3" width="8" height="4" rx="1"/>
//                 <path d="M8 10h8M8 14h8M8 18h8"/>
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-[#234B65] mb-2">Detailed feedbacks</h3>
//             <p className="text-gray-600">Receive detailed feedback and accurate band score of your IELTS writing ability.</p>
//           </div>
//         </div>

//         {/* Quick Response */}
//         <div className="p-6 bg-white rounded-lg border border-[#FFA666] hover:shadow-lg transition-shadow">
//           <div className="flex flex-col items-center text-center">
//             <div className="w-16 h-16 mb-4">
//               <svg viewBox="0 0 24 24" fill="none" stroke="#FFA666" strokeWidth="2">
//                 <circle cx="12" cy="12" r="10"/>
//                 <path d="M12 6v6l4 2"/>
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-[#234B65] mb-2">Quick response</h3>
//             <p className="text-gray-600">No time to waste! Obtain your IELTS writing recording assessment and evaluation from our examiners in just 48 hours.</p>
//           </div>
//         </div>

//         {/* Boost Score */}
//         <div className="p-6 bg-white rounded-lg border border-[#FFA666] hover:shadow-lg transition-shadow">
//           <div className="flex flex-col items-center text-center">
//             <div className="w-16 h-16 mb-4">
//               <svg viewBox="0 0 24 24" fill="none" stroke="#FFA666" strokeWidth="2">
//                 <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-[#234B65] mb-2">Boost score in short time</h3>
//             <p className="text-gray-600">We help to increase your IELTS Writing band score by 0.5 - 1 in short time with suggestions for improvement.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousel1;
import React, { useState, useEffect } from 'react';

const EnhancedCarousel = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="w-full py-12">
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`w-full aspect-video mb-12 bg-gradient-to-r from-pink-900 to-pink-700 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background Decorations */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-400 blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-pink-300 blur-xl"></div>
              <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white blur-lg"></div>
            </div>

            {/* Title */}
            <div className="absolute bottom-16 text-center text-white transform transition-all duration-700">
              <h1 className="text-5xl font-bold mb-3 tracking-wide text-white drop-shadow-lg uppercase">Master IELTS Writing</h1>
              <p className="text-xl font-light tracking-wider text-pink-300 italic">Expert Evaluation for Your Success</p>
            </div>
          </div>
        </div>

        {/* Service Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {[
            {
              title: "Real Test Experience 🎯",
              desc: "Feel the real exam pressure! Take a simulated IELTS Writing test graded by certified IELTS examiners.",
            },
            {
              title: "Expert Feedback 📋",
              desc: "Get an in-depth analysis of your writing with detailed feedback and actionable improvement tips.",
            },
            {
              title: "Lightning-Fast Results ⚡",
              desc: "No time to waste! Receive your detailed evaluation and band score within **48 hours**.",
            },
            {
              title: "Boost Your Score 🚀",
              desc: "Our expert insights and strategies help you increase your IELTS Writing score by **0.5 - 1 band** in no time!",
            }
          ].map((item, index) => (
            <div 
              key={index}
              className={`p-6 bg-white rounded-xl border-2 border-pink-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <h3 className="text-2xl font-bold text-pink-700 mb-3">{item.title}</h3>
                <p className="text-gray-600 flex-grow">{item.desc}</p>
                <button className="mt-5 px-6 py-3 w-full bg-pink-700 text-white text-lg font-medium rounded-full hover:bg-pink-800 transition-colors duration-300 shadow-md">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-pink-700 mb-6">Ready to Achieve a Higher IELTS Score?</h2>
          <p className="text-lg text-gray-700 mb-4">Start your expert evaluation today and take the first step towards IELTS success!</p>
          <button className="px-10 py-4 bg-pink-700 text-white rounded-full font-semibold hover:bg-pink-800 transition-colors duration-300 shadow-lg text-lg">
            Start Assessment Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCarousel;
