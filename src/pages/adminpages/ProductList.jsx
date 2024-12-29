import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { isAuthenticated } from "../../auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const { token } = isAuthenticated();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/productlist`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Failed to load products");
      });
  }, [token]);

  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      axios
        .delete(`/api/deleteProduct/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Product deleted");
          setProduct(product.filter((data) => data._id !== id));
        })
        .catch(() => toast.error("Failed to delete!"));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg text-gray-700">Loading classes...</span>
      </div>
    );
  }

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <div className="bg-white shadow-lg rounded-xl">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Class Management</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your class listings and availability</p>
        </div>

        <div className="divide-y divide-gray-200">
          {product.length > 0 ? (
            product.map((data) => (
              <div 
                key={data._id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {/* Main Row */}
                <div className="grid grid-cols-7 gap-4 p-4 items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`http://localhost:9000/public/uploads/${data.product_image}`}
                      alt={data.product_name}
                      className="h-12 w-12 object-cover rounded-lg shadow-sm"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{data.product_name}</h3>
                      <p className="text-green-600 font-medium text-sm">Rs.{data.product_price}</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {data.category?.category_name || "N/A"}
                    </span>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-900">{data.instructor || "N/A"}</p>
                    <p className="text-gray-500 text-xs">Instructor</p>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-900">{data.duration || "N/A"}</p>
                    <p className="text-gray-500 text-xs">Duration</p>
                  </div>

                  <div>
                    <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${
                      data.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {data.countInStock} spots
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/admin/updateproduct/${data._id}`}
                      className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(data._id)}
                      className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>

                  <button
                    onClick={() => setExpandedId(expandedId === data._id ? null : data._id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedId === data._id ? "Less Info" : "More Info"}
                  </button>
                </div>

                {/* Expandable Details Row */}
                {expandedId === data._id && (
                  <div className="grid grid-cols-2 gap-6 px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                      <p className="text-sm text-gray-700">
                        {data.product_description || "No description available"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Schedule</h4>
                      {Array.isArray(data.schedule) && data.schedule.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {data.schedule.map((item, index) => (
                            <div key={index} className="text-sm text-gray-700">
                              <span className="font-medium">{item.day}:</span>{" "}
                              {item.time}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No schedule available</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No classes available</div>
              <p className="text-gray-400 text-sm mt-1">Add new classes to get started</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;