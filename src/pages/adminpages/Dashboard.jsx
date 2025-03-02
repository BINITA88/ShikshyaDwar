import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { isAuthenticated } from "../../auth";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [categoryCount, setCategoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const { token } = isAuthenticated();

      try {
        const [categoryRes, productRes, userRes] = await Promise.all([
          axios.get("/api/categoryList"),
          axios.get("/api/productlist"),
          axios.get("/api/bookinglist", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setCategoryCount(categoryRes.data.length);
        setProductCount(productRes.data.length);
        setUserCount(userRes.data.length);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        }
      }
    }
  };

  const categoryPieData = {
    labels: ['Categories', 'Available Slots'],
    datasets: [{
      data: [categoryCount, Math.max(20 - categoryCount, 0)],
      backgroundColor: ['#36A2EB', '#E2EEF9'],
      borderColor: ['#2F90D7', '#D1E3F6'],
      borderWidth: 1
    }]
  };

  const productPieData = {
    labels: ['Products', 'Available Slots'],
    datasets: [{
      data: [productCount, Math.max(100 - productCount, 0)],
      backgroundColor: ['#FFCE56', '#FFF6DD'],
      borderColor: ['#E6B84F', '#FFE4B5'],
      borderWidth: 1
    }]
  };

  const userPieData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [{
      data: [userCount, Math.max(50 - userCount, 0)],
      backgroundColor: ['#4CAF50', '#E8F5E9'],
      borderColor: ['#43A047', '#C8E6C9'],
      borderWidth: 1
    }]
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600 font-semibold">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600 font-semibold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50  min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
        <div className="flex mt-4 gap-4">
          <button
            onClick={() => setTimeRange('day')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'day' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-lg ${
              timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Categories</h3>
            <p className="text-sm text-gray-500">Total active categories</p>
          </div>
          <div className="h-64">
            <Pie data={categoryPieData} options={chartOptions} />
          </div>
          <div className="mt-4 text-center">
            <span className="text-2xl font-bold text-gray-800">{categoryCount}</span>
            <span className="text-sm text-gray-500 ml-2">of 20 slots used</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Courses</h3>
            <p className="text-sm text-gray-500">Total available Courses</p>
          </div>
          <div className="h-64">
            <Pie data={productPieData} options={chartOptions} />
          </div>
          <div className="mt-4 text-center">
            <span className="text-2xl font-bold text-gray-800">{productCount}</span>
            <span className="text-sm text-gray-500 ml-2">of 100 slots used</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Student enrolled</h3>
            <p className="text-sm text-gray-500">Active student base</p>
          </div>
          <div className="h-64">
            <Pie data={userPieData} options={chartOptions} />
          </div>
          <div className="mt-4 text-center">
            <span className="text-2xl font-bold text-gray-800">{userCount}</span>
            <span className="text-sm text-gray-500 ml-2">of 50 slots used</span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600 mb-1">Categories Status</div>
            <div className="text-2xl font-bold text-blue-700">{categoryCount}</div>
            <div className="text-sm text-blue-600">
              {((categoryCount / 20) * 100).toFixed(1)}% utilized
            </div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="text-sm text-yellow-600 mb-1">Products Status</div>
            <div className="text-2xl font-bold text-yellow-700">{productCount}</div>
            <div className="text-sm text-yellow-600">
              {((productCount / 100) * 100).toFixed(1)}% utilized
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600 mb-1">Booking Status</div>
            <div className="text-2xl font-bold text-green-700">{userCount}</div>
            <div className="text-sm text-green-600">
              {((userCount / 50) * 100).toFixed(1)}% utilized
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;