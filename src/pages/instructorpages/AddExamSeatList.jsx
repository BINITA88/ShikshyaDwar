// import React, { useState, useEffect } from "react";
// import { isAuthenticated } from "../../auth";
// import { AlertCircle } from "lucide-react";
// import axios from "axios";

// const AddExamSeatList = () => {
//   const [seatList, setSeatList] = useState([]);
//   const [error, setError] = useState("");

//   const { token } = isAuthenticated();

//   useEffect(() => {
//     const fetchSeats = async () => {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         const response = await axios.get("/api/seat", config); // Adjust endpoint if necessary
//         setSeatList(response.data);
//       } catch (err) {
//         setError("Failed to fetch seat list");
//       }
//     };

//     fetchSeats();
//   }, [token]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900">Seat List</h2>
//           <p className="mt-2 text-gray-600">View all available seats</p>
//         </div>

//         {error && (
//           <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 animate-fadeIn">
//             <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         )}

//         {seatList.length > 0 ? (
//           <ul className="space-y-4">
//             {seatList.map((seat) => (
//               <li
//                 key={seat.id}
//                 className="p-4 bg-white shadow rounded-md border border-gray-200"
//               >
//                 <p className="text-sm font-medium text-gray-700">
//                   Seat Number: {seat.seatNumber}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Status: {seat.isBooked ? "Booked" : "Available"}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-sm text-gray-600">No seats available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddExamSeatList;



// import React, { useState, useEffect } from "react";
// import { isAuthenticated } from "../../auth";
// import { AlertCircle, CheckCircle, Trash2 } from "lucide-react";
// import axios from "axios";

// const AddExamSeatList = () => {
//   const [seatList, setSeatList] = useState([]);
//   const [error, setError] = useState("");
//   const { token } = isAuthenticated();

//   useEffect(() => {
//     const fetchSeats = async () => {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         const response = await axios.get("/api/seat", config);
//         setSeatList(response.data);
//       } catch (err) {
//         setError("Failed to fetch seat list");
//       }
//     };
//     fetchSeats();
//   }, [token]);

//   const deleteSeat = async (seatNumber) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       await axios.delete(`/api/seat/${seatNumber}`, config);
//       setSeatList(seatList.filter((seat) => seat.seatNumber !== seatNumber));
//     } catch (err) {
//       setError("Failed to delete seat");
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const fetchSeats = async () => {
//         try {
//           const config = {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           };
//           const response = await axios.get("/api/seat", config);
//           setSeatList(response.data);
//         } catch (err) {
//           setError("Failed to fetch seat list");
//         }
//       };
//       fetchSeats();
//     }, 5000); // Refresh seat list every 5 seconds

//     return () => clearInterval(interval);
//   }, [token]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-5xl mx-auto px-6">
//         <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Exam Seat List</h2>
//         {error && <p className="text-red-600 text-center">{error}</p>}
//         {seatList.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {seatList.map((seat) => (
//               <div key={seat.seatNumber} className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex justify-between items-center">
//                 <div>
//                   <h3 className="text-lg font-semibold">Seat {seat.seatNumber}</h3>
//                   <span className={`px-3 py-1 text-sm rounded-full ${seat.isBooked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
//                     {seat.isBooked ? "Booked" : "Available"}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => deleteSeat(seat.seatNumber)}
//                   className="p-2 text-red-600 hover:text-red-800"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-600">No seats available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddExamSeatList;
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import { AlertCircle, Trash2 } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddExamSeatList = () => {
  const [allSeats, setAllSeats] = useState([]);
  const [error, setError] = useState("");
  const { token } = isAuthenticated();

  // Fetch all seats
  const fetchSeats = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("/api/seat", config);
      setAllSeats(response.data || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch seats.");
      toast.error("Failed to fetch seats.");
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  // Toggle seat booking status
  const toggleSeatStatus = async (seatNumber, currentStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const action = currentStatus ? "book" : "unbook";
      const response = await axios.post(`/api/seat/${action}`, { seatNumber }, config);

      if (response.status === 200) {
        setAllSeats((prevSeats) =>
          prevSeats.map((seat) =>
            seat.seatNumber === seatNumber ? { ...seat, booked: !currentStatus } : seat
          )
        );
        toast.success(`Seat ${seatNumber} successfully ${currentStatus ? "unbooked" : "booked"}!`);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to change seat status.");
      toast.error("Failed to change seat status.");
    }
  };

  // Delete a seat
  const deleteSeat = async (seatNumber) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`/api/seat/${seatNumber}`, config);

      setAllSeats((prevSeats) => prevSeats.filter((seat) => seat.seatNumber !== seatNumber));
      toast.success(`Seat ${seatNumber} deleted successfully!`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete seat.");
      toast.error("Failed to delete seat.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Manage Exam Seats</h2>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* List of All Seats */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">All Exam Seats</h3>
          <div className="mt-4">
            {allSeats.length === 0 ? (
              <p>No seats available.</p>
            ) : (
              <ul className="space-y-4">
                {allSeats.map((seat) => (
                  <li key={seat.seatNumber} className="flex justify-between items-center bg-white p-3 rounded-md shadow">
                    <span className="text-sm font-medium text-gray-800">Seat {seat.seatNumber}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSeatStatus(seat.seatNumber, seat.booked)}
                        className={`px-3 py-1 text-xs rounded-full ${
                          seat.booked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                        }`}
                      >
                        {seat.booked ? "Book" : "Unbook"}
                      </button>
                      <button onClick={() => deleteSeat(seat.seatNumber)} className="text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExamSeatList;
