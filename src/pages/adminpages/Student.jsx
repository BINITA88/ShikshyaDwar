import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { isAuthenticated } from '../../auth';
import { Search, Users, Mail, RefreshCw, Filter, Download, Clock, School, Heart } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const StudentDetails = () => {
  const { token } = isAuthenticated();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch booking data from bookinglist endpoint
      const bookingRes = await axios.get('/api/bookinglist', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Set the booking data to user state
      setUser(bookingRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedUsers = user
    .filter(student => 
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.shift?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.classMode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.city?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Shift', 'Class Mode', 'Phone', 'Status', 'City', 'Interested In Counseling'];
    const csvData = filteredAndSortedUsers.map(student => 
      [
        student.name || 'N/A',
        student.email || 'N/A',
        student.shift || 'N/A',
        student.classMode || 'N/A',
        student.phone || 'N/A',
        student.status || 'N/A',
        student.city || 'N/A',
        student.interestedInCounseling ? 'Yes' : 'No'
      ].join(',')
    );
    const csv = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <ToastContainer theme="colored" position="top-center" />
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
          <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm">
            {filteredAndSortedUsers.length} Students
          </span>
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

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-lg text-gray-700">Loading students...</span>
        </div>
      ) : filteredAndSortedUsers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th 
                  className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Student Info
                    {sortField === 'name' && (
                      <Filter className={`h-4 w-4 ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th 
                  className="p-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('shift')}
                >
                  <div className="flex items-center gap-2">
                    Shift & Mode
                    {sortField === 'shift' && (
                      <Filter className={`h-4 w-4 ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="p-4 text-left font-medium text-gray-700">Counseling</th>
                <th className="p-4 text-left font-medium text-gray-700">Phone</th>
                {/* <th className="p-4 text-left font-medium text-gray-700">Status</th> */}
                <th className="p-4 text-left font-medium text-gray-700">Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedUsers.map((data) => (
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
                  {/* <td className="p-4">{data.status || 'N/A'}</td> */}
                  <td className="p-4">{data.city || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No students found.</p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-indigo-600 hover:text-indigo-700"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
