import React from 'react'
import L1Image from '../../assets/img/library.png';
import  L2Image from '../../assets/img/student.png';

const Library = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:justify-between  mb-6 px-6 lg:px-20">
        <div className="flex flex-col items-center mb-10 lg:mb-0">
          <div className="w-full lg:w-1/2 h-auto">
            <img className="mx-auto" style={{ width: 600, height: 300 }} src={L1Image} alt="Student" />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-xl font-semibold">Student</h1>
            <p className="text-gray-700">Students can check their assignment by logging into the assignment management system here. Parents and guardians can also enter the system.</p>
          </div>
        </div>
        <div className="flex flex-col items-center ml-12" >
          <div className="w-full lg:w-1/2 h-auto">
            <img className="mx-auto" style={{ width: 800, height: 300  }} src={L2Image} alt="Library" />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-xl font-semibold">Preperation Classes</h1>
            <p className="text-gray-700">Libraries at the Ullens School hold over 20,000 books, periodicals, and resource materials. Students have access to an online library management system.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Library
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

//   // Enhanced Seat Component with Monitor
//   const ComputerSeat = ({ seat, onSelect }) => (
//     <div 
//       onClick={() => seat.status === 'Available' && onSelect(seat.seatNumber)}
//       className={`relative group transition-transform duration-300 
//         ${seat.status === 'Available' && 'hover:scale-105 cursor-pointer'} p-2`}
//     >
//       {/* Monitor */}
//       <div className={`w-16 h-12 mx-auto mb-1 rounded-t-lg border-4 
//         ${seat.status === 'Booked' ? 'border-gray-300 bg-gray-200' : 
//           seat.status === 'Selected' ? 'border-red-500 bg-red-100' : 'border-blue-300 bg-blue-50'}
//         transform group-hover:scale-105 transition-all duration-300`}>
//         <div className={`h-2 w-8 mx-auto mt-1 rounded
//           ${seat.status === 'Booked' ? 'bg-gray-400' : seat.status === 'Selected' ? 'bg-red-600' : 'bg-blue-400'}`}></div>
//       </div>
//       {/* Stand */}
//       <div className={`w-4 h-4 mx-auto 
//         ${seat.status === 'Booked' ? 'bg-gray-300' : seat.status === 'Selected' ? 'bg-red-500' : 'bg-blue-300'}`}></div>
//       {/* Desk */}
//       <div className={`w-20 h-6 mx-auto rounded-lg 
//         ${seat.status === 'Booked' ? 'bg-gray-200' : seat.status === 'Selected' ? 'bg-red-200' : 'bg-blue-100'}
//         shadow-md transform group-hover:translate-y-1 transition-all duration-300`}>
//         <span className={`text-xs font-medium flex items-center justify-center h-full
//           ${seat.status === 'Booked' ? 'text-gray-500' : seat.status === 'Selected' ? 'text-red-700' : 'text-blue-700'}`}>
//           {seat.seatNumber}
//         </span>
//       </div>
//       {/* Chair */}
//       <div className={`w-12 h-8 mx-auto mt-1 rounded-b-lg
//         ${seat.status === 'Booked' ? 'bg-gray-300' : seat.status === 'Selected' ? 'bg-red-400' : 'bg-blue-200'}
//         transform group-hover:translate-y-1 transition-all duration-300`}>
//         {(seat.status === 'Selected' || seat.status === 'Booked') && (
//           <div className="w-6 h-6 mx-auto bg-current rounded-full 
//             transform -translate-y-1 animate-bounce"></div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto space-y-8">
//         <h1 className="text-3xl font-bold text-center text-red-700">Mock Test Pre Booking </h1>

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
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Book your Seats for test</h2>
//           {seats.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               {seats.map((seat) => (
//                 <ComputerSeat
//                   key={seat._id}
//                   seat={seat}
//                   onSelect={handleSeatBooking}
//                 />
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
