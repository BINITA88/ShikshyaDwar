// import React, { useState } from 'react';

// const TestPreparationSeatBooking = () => {
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [bookedSeats, setBookedSeats] = useState([2, 5, 9]);
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   const timeSlots = [
//     '09:00 AM', '10:00 AM', '11:00 AM', 
//     '12:00 PM', '02:00 PM', '03:00 PM'
//   ];

//   // Enhanced Seat Component with Monitor
//   const ComputerSeat = ({ number, selected, booked, onSelect }) => (
//     <div 
//       onClick={() => !booked && onSelect(number)}
//       className={`relative group transition-transform duration-300 
//         ${!booked && 'hover:scale-105 cursor-pointer'} p-2`}
//     >
//       {/* Monitor */}
//       <div className={`w-16 h-12 mx-auto mb-1 rounded-t-lg border-4 
//         ${booked ? 'border-gray-300 bg-gray-200' : 
//           selected ? 'border-red-500 bg-red-100' : 'border-blue-300 bg-blue-50'}
//         transform group-hover:scale-105 transition-all duration-300`}>
//         <div className={`h-2 w-8 mx-auto mt-1 rounded
//           ${booked ? 'bg-gray-400' : selected ? 'bg-red-600' : 'bg-blue-400'}`}></div>
//       </div>
//       {/* Stand */}
//       <div className={`w-4 h-4 mx-auto 
//         ${booked ? 'bg-gray-300' : selected ? 'bg-red-500' : 'bg-blue-300'}`}></div>
//       {/* Desk */}
//       <div className={`w-20 h-6 mx-auto rounded-lg 
//         ${booked ? 'bg-gray-200' : selected ? 'bg-red-200' : 'bg-blue-100'}
//         shadow-md transform group-hover:translate-y-1 transition-all duration-300`}>
//         <span className={`text-xs font-medium flex items-center justify-center h-full
//           ${booked ? 'text-gray-500' : selected ? 'text-red-700' : 'text-blue-700'}`}>
//           {number + 1}
//         </span>
//       </div>
//       {/* Chair */}
//       <div className={`w-12 h-8 mx-auto mt-1 rounded-b-lg
//         ${booked ? 'bg-gray-300' : selected ? 'bg-red-400' : 'bg-blue-200'}
//         transform group-hover:translate-y-1 transition-all duration-300`}>
//         {(selected || booked) && (
//           <div className="w-6 h-6 mx-auto bg-current rounded-full 
//             transform -translate-y-1 animate-bounce"></div>
//         )}
//       </div>
//     </div>
//   );

//   // Calendar Component
//   const Calendar = () => {
//     const daysInMonth = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth() + 1,
//       0
//     ).getDate();

//     const firstDayOfMonth = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth(),
//       1
//     ).getDay();

//     return (
//       <div className="bg-white rounded-2xl p-6 shadow-xl">
//         <div className="flex justify-between items-center mb-6">
//           <button 
//             onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
//             className="p-2 hover:bg-red-50 rounded-full transition-colors"
//           >
//             ←
//           </button>
//           <h3 className="text-lg font-semibold">
//             {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
//           </h3>
//           <button 
//             onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
//             className="p-2 hover:bg-red-50 rounded-full transition-colors"
//           >
//             →
//           </button>
//         </div>
//         <div className="grid grid-cols-7 gap-2">
//           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//             <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
//               {day.charAt(0)}
//             </div>
//           ))}
//           {[...Array(firstDayOfMonth)].map((_, index) => (
//             <div key={`empty-${index}`} className="p-2"></div>
//           ))}
//           {[...Array(daysInMonth)].map((_, index) => {
//             const date = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${(index + 1).toString().padStart(2, '0')}`;
//             return (
//               <button
//                 key={date}
//                 onClick={() => setSelectedDate(date)}
//                 className={`p-2 rounded-lg transition-all duration-300 hover:scale-110
//                   ${selectedDate === date 
//                     ? 'bg-red-500 text-white shadow-lg' 
//                     : 'hover:bg-red-50'}`}
//               >
//                 {index + 1}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center relative">
//           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 mb-6">
//             Mock Test Pre Booking
//           </h1>
//           <div className="flex justify-center gap-4 mb-8">
//             {['IELTS', 'PTE'].map((course) => (
//               <button
//                 key={course}
//                 onClick={() => setSelectedCourse(course)}
//                 className={`px-8 py-3 rounded-xl transition-all duration-300 
//                   ${selectedCourse === course 
//                     ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg' 
//                     : 'bg-white text-red-600 hover:bg-red-50'}`}
//               >
//                 {course}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Seat Selection */}
//           <div className="bg-white rounded-2xl p-6 shadow-xl col-span-2">
//             <h2 className="text-2xl font-semibold mb-8 text-gray-800">Hold your seat for the test</h2>
            
//             {/* Instructor Area */}
//             <div className="w-full h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl mb-8 
//               flex items-center justify-center shadow-inner">
//               <span className="text-gray-600 font-medium">Instructor's Station</span>
//             </div>

//             {/* Computer Stations */}
//             <div className="grid grid-cols-5 gap-4 px-4">
//               {Array.from({ length: 20 }, (_, index) => (
//                 <ComputerSeat
//                   key={index}
//                   number={index}
//                   selected={selectedSeat === index}
//                   booked={bookedSeats.includes(index)}
//                   onSelect={setSelectedSeat}
//                 />
//               ))}
//             </div>

//             {/* Legend */}
//             <div className="mt-8 flex justify-around p-4 bg-gray-50 rounded-xl">
//               <div className="flex items-center">
//                 <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
//                 <span>Selected</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
//                 <span>Booked</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-4 h-4 bg-blue-300 rounded-full mr-2"></div>
//                 <span>Available</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-8">
//             {/* Calendar */}
//             <Calendar />

//             {/* Time Selection */}
//             <div className="bg-white rounded-2xl p-6 shadow-xl">
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Time</h2>
//               <div className="grid grid-cols-2 gap-3">
//                 {timeSlots.map((time) => (
//                   <button
//                     key={time}
//                     onClick={() => setSelectedTime(time)}
//                     className={`py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105
//                       ${selectedTime === time
//                         ? 'bg-red-500 text-white shadow-lg'
//                         : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
//                   >
//                     {time}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Booking Button */}
//             <button
//               onClick={() => {
//                 if (selectedSeat !== null && selectedDate && selectedTime && selectedCourse) {
//                   alert(`Booking confirmed!\n${selectedCourse} Exam\nSeat ${selectedSeat + 1}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
//                   setBookedSeats([...bookedSeats, selectedSeat]);
//                 }
//               }}
//               disabled={!selectedSeat || !selectedDate || !selectedTime || !selectedCourse}
//               className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-300
//                 ${selectedSeat && selectedDate && selectedTime && selectedCourse
//                   ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
//                   : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
//             >
//               Confirm Booking
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestPreparationSeatBooking;




















import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../../auth";
import { Clock, Calendar, Info } from 'lucide-react';

const TestPreparationSeatBooking = () => {
  const [seats, setSeats] = useState([]); // All seats in a single array
  const [error, setError] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const { token } = isAuthenticated();

  // Fetch the seat status from the backend
  useEffect(() => {
    const fetchSeatStatus = async () => {
      try {
        const response = await fetch('/api/seat/status', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Combine both available and unavailable seats in one array
        const combinedSeats = [
          ...data.availableSeats.map(seat => ({ ...seat, status: 'Available' })),
          ...data.unavailableSeats.map(seat => ({ ...seat, status: 'Booked' }))
        ];
        setSeats(combinedSeats);
      } catch (err) {
        console.error('Error fetching seat status:', err);
        setError('Failed to fetch the seat status.');
      }
    };

    if (token) {
      fetchSeatStatus();
    } else {
      setError('User is not authenticated.');
    }
  }, [token]);

  // Handle seat booking click
  const handleSeatBooking = async (seatNumber) => {
    try {
      const response = await fetch('/api/seat/book', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seatNumber }), // Send seat number to book
      });
  
      if (!response.ok) {
        throw new Error('Failed to book the seat');
      }
  
      // Update the seat status locally
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.seatNumber === seatNumber ? { ...seat, status: 'Booked' } : seat
        )
      );
  
      // Calculate the nearest Saturday date
      const today = new Date();
      const daysUntilSaturday = (6 - today.getDay() + 7) % 7; // Ensure Saturday is calculated correctly
      const nextSaturday = new Date(today);
      nextSaturday.setDate(today.getDate() + daysUntilSaturday);
  
      // Format the Saturday date
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = nextSaturday.toLocaleDateString(undefined, options);
  
      // Show confirmation popup message
      setPopupMessage(`Seat booked successfully for this Saturday (${formattedDate})!`);
    } catch (err) {
      console.error('Error booking seat:', err);
      setError('Failed to book the seat.');
    }
  };
  
  // Enhanced Seat Component with Monitor
  const ComputerSeat = ({ seat, onSelect }) => (
    <div 
      onClick={() => seat.status === 'Available' && onSelect(seat.seatNumber)}
      className={`relative group transition-transform duration-300 
        ${seat.status === 'Available' && 'hover:scale-105 cursor-pointer'} p-2`}
    >
      {/* Monitor */}
      <div className={`w-16 h-12 mx-auto mb-1 rounded-t-lg border-4 
        ${seat.status === 'Booked' ? 'border-gray-300 bg-gray-200' : 
          seat.status === 'Selected' ? 'border-red-500 bg-red-100' : 'border-blue-300 bg-blue-50'}
        transform group-hover:scale-105 transition-all duration-300`}>
        <div className={`h-2 w-8 mx-auto mt-1 rounded
          ${seat.status === 'Booked' ? 'bg-gray-400' : seat.status === 'Selected' ? 'bg-red-600' : 'bg-blue-400'}`}></div>
      </div>
      {/* Stand */}
      <div className={`w-4 h-4 mx-auto 
        ${seat.status === 'Booked' ? 'bg-gray-300' : seat.status === 'Selected' ? 'bg-red-500' : 'bg-blue-300'}`}></div>
      {/* Desk */}
      <div className={`w-20 h-6 mx-auto rounded-lg 
        ${seat.status === 'Booked' ? 'bg-gray-200' : seat.status === 'Selected' ? 'bg-red-200' : 'bg-blue-100'}
        shadow-md transform group-hover:translate-y-1 transition-all duration-300`}>
<span
  className={`text-xs font-medium flex items-center justify-center h-full
    ${seat.status === 'Booked' || seat.status === 'Available' ? 'opacity-0' : 
     'opacity-100 text-blue-700'}`}>
  {seat.seatNumber}
</span>



      </div>
      {/* Chair */}
      <div className={`w-12 h-8 mx-auto mt-1 rounded-b-lg
        ${seat.status === 'Booked' ? 'bg-gray-300' : seat.status === 'Selected' ? 'bg-red-400' : 'bg-blue-200'}
        transform group-hover:translate-y-1 transition-all duration-300`}>
        {(seat.status === 'Selected' || seat.status === 'Booked') && (
          <div className="w-6 h-6 mx-auto bg-current rounded-full 
            transform -translate-y-1 animate-bounce"></div>
        )}
      </div>
    </div>
  );

  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Stylish Header */}
        <div className="bg-white shadow-xl rounded-2xl p-6 grid md:grid-cols-3 gap-4 items-center">
          {[
            { Icon: Calendar, title: 'Saturday Tests', subtitle: 'Weekly Mock', color: 'blue' },
            { Icon: Clock, title: '9:00 - 11:30', subtitle: 'Fixed Time', color: 'green' },
            { Icon: Info, title: 'Limited Seats', subtitle: 'Book Early', color: 'red' }
          ].map(({ Icon, title, subtitle, color }, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Icon className={`text-${color}-600 w-10 h-10 transform hover:rotate-6 transition-transform`} />
              <div>
                <h3 className={`text-base font-bold text-${color}-800`}>{title}</h3>
                <p className="text-sm text-gray-600">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-extrabold text-center text-blue-900 tracking-tight">
          Mock Test Seat Booking
        </h1>

        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg animate-pulse">
            {error}
          </div>
        )}

        {popupMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-r-lg animate-bounce">
            {popupMessage}
          </div>
        )}

        {/* Display All Seats (Available & Booked mixed together) */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Limited Seat Available </h2>
          {seats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {seats.map((seat) => (
                <ComputerSeat
                  key={seat._id}
                  seat={seat}
                  onSelect={handleSeatBooking}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No seats available or booked.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPreparationSeatBooking;


// import React, { useState, useEffect } from 'react';
// import { isAuthenticated } from "../../auth";

// const TestPreparationSeatBooking = () => {
//   const [seats, setSeats] = useState([]); // All seats in a single array
//   const [error, setError] = useState('');
//   const [popupMessage, setPopupMessage] = useState('');
//   const { token } = isAuthenticated();

//   // Fetch the seat status from the backend
//   useEffect(() => {
//     const fetchSeatStatus = async () => {
//       try {
//         const response = await fetch('/api/seat/status', {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();

//         // Combine both available and unavailable seats in one array
//         const combinedSeats = [
//           ...data.availableSeats.map(seat => ({ ...seat, status: 'Available' })),
//           ...data.unavailableSeats.map(seat => ({ ...seat, status: 'Booked' }))
//         ];
//         setSeats(combinedSeats);
//       } catch (err) {
//         console.error('Error fetching seat status:', err);
//         setError('Failed to fetch the seat status.');
//       }
//     };

//     if (token) {
//       fetchSeatStatus();
//     } else {
//       setError('User is not authenticated.');
//     }
//   }, [token]);

//   // Handle seat booking click
//   const handleSeatBooking = async (seatNumber) => {
//     try {
//       const response = await fetch('/api/seat/book', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ seatNumber }), // Send seat number to book
//       });

//       if (!response.ok) {
//         throw new Error('Failed to book the seat');
//       }

//       // Update the seat status locally
//       setSeats(prevSeats =>
//         prevSeats.map(seat =>
//           seat.seatNumber === seatNumber ? { ...seat, status: 'Booked' } : seat
//         )
//       );

//       // Show confirmation popup message
//       setPopupMessage('Seat booked successfully!');
//     } catch (err) {
//       console.error('Error booking seat:', err);
//       setError('Failed to book the seat.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <h1 className="text-3xl font-bold text-center text-red-700">Seat Booking</h1>

//         {error && (
//           <div className="text-red-600 text-center">
//             <p>{error}</p>
//           </div>
//         )}

//         {popupMessage && (
//           <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center mb-4">
//             <p>{popupMessage}</p>
//           </div>
//         )}

//         {/* Display All Seats (Available & Booked mixed together) */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Seats</h2>
//           {seats.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               {seats.map((seat) => (
//                 <div
//                   key={seat._id}
//                   className={`p-4 rounded-lg shadow-lg border cursor-pointer ${
//                     seat.status === 'Available'
//                       ? 'bg-green-100 hover:bg-green-200'
//                       : 'bg-gray-300 cursor-not-allowed'
//                   }`}
//                   onClick={() => seat.status === 'Available' && handleSeatBooking(seat.seatNumber)}
//                 >
//                   <h3 className="text-lg font-semibold text-gray-700">
//                     Seat {seat.seatNumber}
//                   </h3>
//                   <p className={`text-sm ${seat.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
//                     {seat.status}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-600">No seats available or booked.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestPreparationSeatBooking;
