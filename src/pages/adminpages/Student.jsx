import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { isAuthenticated } from '../../auth';
import { Search, Users, Mail, RefreshCw, Download, Clock, School, Heart, CreditCard } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2 } from 'lucide-react';

const StudentDetails = () => {
  const { token } = isAuthenticated();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentStatuses, setPaymentStatuses] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const bookingRes = await axios.get('/api/bookinglist', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(bookingRes.data);

      // Initialize payment statuses
      const initialStatuses = {};
      bookingRes.data.forEach(student => {
        initialStatuses[student._id] = true; // Default: unpaid
      });
      setPaymentStatuses(initialStatuses);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentToggle = (id) => {
    setPaymentStatuses((prev) => {
      const currentStatus = prev[id] || "paid"; // Default to "Full Payment"
  
      let newStatus;
      if (currentStatus === "paid") {
        newStatus = "remaining"; // Move to "Remaining Payment"
      } else if (currentStatus === "remaining") {
        newStatus = "pending"; // Move to "Pending"
      } else {
        newStatus = "paid"; // Reset to "Full Payment"
      }
  
      return { ...prev, [id]: newStatus };
    });
  
    // Update the status in the user state
    setUser((prevUsers) =>
      prevUsers.map((student) =>
        student._id === id ? { ...student, status: paymentStatuses[id] } : student
      )
    );
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
  
    try {
      await axios.delete(`/api/deletebooking/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      toast.success("Booking deleted successfully");
  
      // Update state to remove the deleted user
      setUser((prevUsers) => prevUsers.filter((student) => student._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
      toast.error("Failed to delete booking");
    }
  };
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Status'];
  
    // Ensure user data exists
    if (!user || user.length === 0) {
      toast.error("No students available to export.");
      return;
    }
  
    const csvData = user.map((student) =>
      [
        student?.user?.name || 'N/A',
        student?.user?.email || 'N/A',
        student?.phone || 'N/A',
        paymentStatuses[student._id] || 'Pending'
      ].join(',')
    );
  
    const csv = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
  
    a.href = url;
    a.download = 'students.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  
    toast.success("CSV file downloaded successfully!");
  };
  
  
  const filteredUsers = user.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student?.user?.name?.toLowerCase().includes(searchLower) ||
      student?.user?.email?.toLowerCase().includes(searchLower) ||
      student?.shift?.toLowerCase().includes(searchLower) ||
      student?.classMode?.toLowerCase().includes(searchLower) ||
      student?.phone?.toLowerCase().includes(searchLower) ||
      student?.status?.toLowerCase().includes(searchLower) ||
      student?.city?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <ToastContainer theme="colored" position="top-center" />

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-lg text-gray-700">Loading students...</span>
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-left font-medium text-gray-700">Student Info</th>
                <th className="p-4 text-left font-medium text-gray-700">Shift & Mode</th>
                <th className="p-4 text-left font-medium text-gray-700">Counseling</th>
                <th className="p-4 text-left font-medium text-gray-700">Phone</th>
                <th className="p-4 text-left font-medium text-gray-700">Address</th>
                <th className="p-4 text-left font-medium text-gray-700">Payment Status</th>
                <th className="p-4 text-left font-medium text-gray-700">Delete</th>

              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((data) => (
                <tr key={data._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gray-400" />
                        <span className="font-medium">{data?.user?.name || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Mail className="h-4 w-4" />
                        <span>{data?.user?.email || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{data.shift || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-gray-400" />
                        <span>{data.classMode || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
            
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Heart className={`h-5 w-5 ${data.interestedInCounseling ? 'text-pink-500' : 'text-gray-400'}`} />
                      <span>{data.interestedInCounseling ? 'Interested' : 'Not Interested'}</span>
                    </div>
                  </td>
                  <td className="p-4">{data.phone || 'N/A'}</td>
                  <td className="p-4">{data.city || 'N/A'}</td>
                  <td className="p-4">
  <span
    className={
      paymentStatuses[data._id] === "Done Full Payment"
        ? "text-green-600 font-medium"
        : paymentStatuses[data._id] === "remaining"
        ? "text-yellow-500 font-medium"
        : "text-green-600 font-medium"
    }
  >
    {paymentStatuses[data._id] === "paid"
      ? "Full Payment"
      : paymentStatuses[data._id] === "remaining"
      ? "Remaining Payment"
      : "Payment Completed"}
  </span>
</td>

<td className="p-4">
  <button
    onClick={() => handleDelete(data._id)}
    className="text-red-600 ml-2 hover:text-red-800 transition-all duration-300"
    title="Delete Booking"
  >
    <Trash2 className="h-6 w-6" />
  </button>
</td>




                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default StudentDetails;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import { isAuthenticated } from '../../auth';
// import { Search, Users, Mail, RefreshCw, Download, Clock, School, Heart, Trash2 } from 'lucide-react';
// import 'react-toastify/dist/ReactToastify.css';

// const StudentDetails = () => {
//   const { token } = isAuthenticated();
//   const [user, setUser] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchUsers();
//   }, [token]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const bookingRes = await axios.get('/api/bookinglist', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setUser(bookingRes.data);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       toast.error('Failed to load students');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) return;

//     try {
//       await axios.delete(`/api/deletebooking/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast.success("Booking deleted successfully");

//       // Update state to remove the deleted user
//       setUser((prevUsers) => prevUsers.filter((student) => student._id !== id));
//     } catch (err) {
//       console.error("Error deleting booking:", err);
//       toast.error("Failed to delete booking");
//     }
//   };

//   const filteredUsers = user.filter(student => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       student?.user?.name?.toLowerCase().includes(searchLower) ||
//       student?.user?.email?.toLowerCase().includes(searchLower) ||
//       student?.shift?.toLowerCase().includes(searchLower) ||
//       student?.classMode?.toLowerCase().includes(searchLower) ||
//       student?.phone?.toLowerCase().includes(searchLower) ||
//       student?.paymentStatus?.toLowerCase().includes(searchLower) ||
//       student?.city?.toLowerCase().includes(searchLower)
//     );
//   });

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-6">
//       <ToastContainer theme="colored" position="top-center" />

//       {/* Header Section */}
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
//             className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             <Download className="h-4 w-4" />
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Search Bar */}
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

//       {/* Table Section */}
//       {loading ? (
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
//           <span className="ml-3 text-lg text-gray-700">Loading students...</span>
//         </div>
//       ) : filteredUsers.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//             <thead>
//               <tr className="bg-gray-50 border-b">
//                 <th className="p-4 text-left font-medium text-gray-700">Student Info</th>
//                 <th className="p-4 text-left font-medium text-gray-700">Shift & Mode</th>
//                 <th className="p-4 text-left font-medium text-gray-700">Counseling</th>
//                 <th className="p-4 text-left font-medium text-gray-700">Phone</th>
//                 <th className="p-4 text-left font-medium text-gray-700">Address</th>
//                 <th className="p-4 text-left font-medium text-gray-700">Payment Status</th>
//                 <th className="p-4 text-left font-medium text-gray-700">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((data) => (
//                 <tr key={data._id} className="border-b hover:bg-gray-50 transition-colors">
//                   <td className="p-4">{data?.user?.name || 'N/A'}</td>
//                   <td className="p-4">{data.shift || 'N/A'}</td>
//                   <td className="p-4">
//                     <Heart className={`h-5 w-5 ${data.interestedInCounseling ? 'text-pink-500' : 'text-gray-400'}`} />
//                     {data.interestedInCounseling ? "Interested" : "Not Interested"}
//                   </td>
//                   <td className="p-4">{data.phone || 'N/A'}</td>
//                   <td className="p-4">{data.city || 'N/A'}</td>
//                   <td className="p-4">
//                     <span
//                       className={
//                         data.paymentStatus === "Paid"
//                           ? "text-green-600 font-medium"
//                           : data.paymentStatus === "Pending"
//                           ? "text-red-500 font-medium"
//                           : "text-yellow-500 font-medium"
//                       }
//                     >
//                       {data.paymentStatus}
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     <button
//                       onClick={() => handleDelete(data._id)}
//                       className="text-red-600 hover:text-red-800"
//                       title="Delete Booking"
//                     >
//                       <Trash2 className="h-6 w-6" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p>No students found.</p>
//       )}
//     </div>
//   );
// };

// export default StudentDetails;
