import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { isAuthenticated } from "../../auth";
import { AlertCircle, Trash2, User } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const StudentDetail = () => {
  const [allSeats, setAllSeats] = useState([]);
  const [error, setError] = useState("");
  const { token } = isAuthenticated();

  // Dummy usernames for seats
  const dummyUsernames = ["Ruby", "Karan", "Saru", "Manisha", "Binod", "Kalpana","Binita","Roshan","deepak","samjhana","Raj"];

  // Fetch all seats
  const fetchSeats = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("/api/seat", config);
      setAllSeats(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch seats.");
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

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
    <div className="min-h-screen py-12 flex justify-center">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8 border">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
         Booked Exam Seat Student Details
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mt-4 flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* List of All Seats */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">All  Exam Seats</h3>
          {allSeats.length === 0 ? (
            <p className="text-gray-600 text-center">No seats available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <th className="px-4 py-3 text-left">Username</th>
                    <th className="px-4 py-3 text-left">Seat Number</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allSeats.map((seat, index) => (
                    <tr key={seat.seatNumber} className="border-t hover:bg-gray-50 transition-all">
                      {/* Dummy Usernames */}
                      <td className="px-4 py-3 flex items-center">
                        <User className="h-5 w-5 text-gray-500 mr-2" />
                        {dummyUsernames[index % dummyUsernames.length]}
                      </td>

                      {/* Seat Number */}
                      <td className="px-4 py-3">{seat.seatNumber}</td>

                      {/* Status */}
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            seat.booked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                          }`}
                        >
                          {seat.booked ? "Booked" : "Available"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 flex justify-center items-center">
                        <button
                          onClick={() => deleteSeat(seat.seatNumber)}
                          className="text-red-600 hover:text-red-800 transition-all duration-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import { jwtDecode } from 'jwt-decode'; // Import JWT decoder
// import { Search, Users, Mail, RefreshCw, Download } from 'lucide-react';
// import 'react-toastify/dist/ReactToastify.css';

// const StudentDetails = () => {
//   const getUserFromToken = () => {
//     const token = localStorage.getItem('jwt'); // Get JWT token
//     if (token) {
//       try {
//         const decoded = jwtDecode(token); // Decode token
//         return {
//           userId: decoded._id || '',
//           token: token,
//         };
//       } catch (err) {
//         console.error("Invalid Token", err);
//         return { userId: '', token: '' };
//       }
//     }
//     return { userId: '', token: '' };
//   };

//   // Get user authentication details
//   const authUser = getUserFromToken();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     if (authUser.token) {
//       fetchUsers();
//     }
//   }, [authUser.token]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('/api/userlist', {
//         headers: { Authorization: `Bearer ${authUser.token}` },
//       });

//       console.log("API Response:", res.data); // Debugging
//       setUsers(res.data);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       toast.error('Failed to load students');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exportToCSV = () => {
//     const headers = ['Name', 'Email', 'Phone', 'Status'];
//     const csvData = users.map(user =>
//       [
//         user.name || 'N/A',
//         user.email || 'N/A',
//         user.phone || 'N/A',
//         user.status || 'N/A'
//       ].join(',')
//     );
//     const csv = [headers.join(','), ...csvData].join('\n');
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'students.csv';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6">
//       <ToastContainer theme="colored" position="top-center" />

//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-2">
//           <Users className="h-6 w-6 text-indigo-600" />
//           <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={fetchUsers}
//             className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             <RefreshCw className="h-4 w-4" />
//             Refresh
//           </button>
//           <button
//             onClick={exportToCSV}
//             className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             <Download className="h-4 w-4" />
//             Export CSV
//           </button>
//         </div>
//       </div>

//       <div className="mb-6">
//         <div className="relative">
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search students..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//           />
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
//           <span className="ml-3 text-lg text-gray-700">Loading students...</span>
//         </div>
//       ) : users.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//             <thead>
//               <tr className="bg-gray-50 border-b">
//                 <th className="p-4 text-left font-medium text-gray-700">Student Name</th>
//                 <th className="p-4 text-left font-medium text-gray-700">Email</th>
//                 <th className="p-4 text-left font-medium text-gray-700">Phone</th>
//                 <th className="p-4 text-left font-medium text-gray-700">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user._id} className="border-b hover:bg-gray-50 transition-colors">
//                   <td className="p-4">{user.name || 'N/A'}</td>
//                   <td className="p-4">{user.email || 'N/A'}</td>
//                   <td className="p-4">{user.contact_no || 'N/A'}</td>
//                   <td className="p-4">{user.status || 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-500 text-lg">No students found.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentDetails;
