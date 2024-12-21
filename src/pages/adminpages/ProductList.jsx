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
      });
  }, [token]);

  // Delete products
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
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Class Name</th>
              <th scope="col" className="px-6 py-3">Fee</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Instructor</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Stock Count</th>
              <th scope="col" className="px-6 py-3">Duration</th>
              <th scope="col" className="px-6 py-3">Schedule</th>
              <th scope="col" className="px-6 py-3">Class Images</th>
              <th scope="col" className="px-6 py-3">Edit</th>
              <th scope="col" className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {product.length > 0 ? (
              product.map((data) => (
                <tr
                  key={data._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.product_name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Rs.{data.product_price}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.category?.category_name || "N/A"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.instructor || "N/A"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.product_description || "No description available"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.countInStock}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.duration || "N/A"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.schedule.length > 0 ? (
                      <ul>
                        {data.schedule.map((item, index) => (
                          <li key={index}>
                            {item.day}: {item.time}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No schedule available</p>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img
                      src={`http://localhost:9000/public/uploads/${data.product_image}`}
                      alt={data.product_name}
                      className="h-10 w-10 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/admin/updateproduct/${data._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteProduct(data._id)}
                      className="ml-4 font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center px-6 py-4">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
