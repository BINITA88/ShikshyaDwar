import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // States to hold the data
  const [categoryCount, setCategoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch total counts for categories and products
  useEffect(() => {
    setLoading(true);

    // Fetch categories
    axios
      .get("/api/categoryList")
      .then((res) => {
        setCategoryCount(res.data.length); // Count categories
      })
      .catch((err) => console.log("Error fetching categories:", err));

    // Fetch products
    axios
      .get("/api/productlist")
      .then((res) => {
        setProductCount(res.data.length); // Count products
      })
      .catch((err) => console.log("Error fetching products:", err))
      .finally(() => setLoading(false)); // End loading when all requests complete
  }, []);

  // Pie chart data configuration
  const categoryPieData = {
    labels: ["Categories"],
    datasets: [
      {
        label: "Total Count",
        data: [categoryCount],
        backgroundColor: ["#36A2EB"], // Blue
        hoverBackgroundColor: ["#2F90D7"],
      },
    ],
  };

  const productPieData = {
    labels: ["Products"],
    datasets: [
      {
        label: "Total Count",
        data: [productCount],
        backgroundColor: ["#FFCE56"], // Yellow
        hoverBackgroundColor: ["#E6B84F"],
      },
    ],
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl text-gray-500">Loading...</div>
    ); // Display loading until data is fetched
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-around items-center gap-10">
        {/* Pie Chart for Categories */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Categories</h3>
          <Pie data={categoryPieData} />
        </div>

        {/* Table for Total Counts */}
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Total Counts</h3>
          <table className="w-full text-sm text-left text-gray-500">
            <tbody>
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700">Categories</td>
                <td className="px-4 py-2">{categoryCount}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700">Products</td>
                <td className="px-4 py-2">{productCount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pie Chart for Products */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Courses</h3>
          <Pie data={productPieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
