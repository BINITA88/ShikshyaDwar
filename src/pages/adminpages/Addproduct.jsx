import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../auth";
import axios from "axios";

const Addproduct = () => {
  const [category, setCategory] = useState([]); 
  const [product, setProduct] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    // countInStock: "",
    product_image: "",
    category: "",
    duration: "", // Added duration field
    schedule: [], // Added schedule field
    instructor: "" // Added instructor field
  });
  const [scheduleInput, setScheduleInput] = useState({ day: "", time: "" }); // Temp input for schedule
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { product_name, product_price, product_description, product_image, category: productCategory, duration, schedule, instructor } = product;
  const { token } = isAuthenticated();

  // Fetch categories on component mount
  useEffect(() => {
    axios
      .get(`/api/categorylist`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle input changes
  const onHandleChange = (name) => (e) => {
    setProduct({
      ...product,
      [name]: e.target.value,
    });
  };

  // Handle image input change
  const onHandleImage = (e) => {
    setProduct({
      ...product,
      product_image: e.target.files[0],
    });
  };

  // Handle schedule addition
  const addSchedule = () => {
    if (scheduleInput.day && scheduleInput.time) {
      setProduct({
        ...product,
        schedule: [...schedule, scheduleInput],
      });
      setScheduleInput({ day: "", time: "" });
    }
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_price", product_price);
      formData.append("product_description", product_description);
      // formData.append("countInStock", countInStock);
      formData.append("product_image", product_image);
      formData.append("category", productCategory);
      formData.append("duration", duration);
      formData.append("schedule", JSON.stringify(schedule)); // Add schedule as JSON string
      formData.append("instructor", instructor); // Add instructor field

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`/api/postproduct`, formData, config);
      setSuccess(true);
      setError("");
      setProduct({
        product_name: "",
        product_price: "",
        product_description: "",
        // countInStock: "",
        product_image: "",
        category: "",
        duration: "",
        schedule: [],
        instructor: "", // Reset instructor field
      });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess(false);
    }
  };

  // Show error message
  const showError = () =>
    error && (
      <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
        <strong className="font-bold text-sm mr-2">Error!</strong>
        <span className="block text-sm sm:inline">{error}</span>
      </div>
    );

  // Show success message
  const showSuccess = () =>
    success && (
      <div className="bg-green-100 text-green-800 p-4 rounded-lg" role="alert">
        <strong className="font-bold text-sm mr-2">Success!</strong>
        <span className="block text-sm sm:inline">Product added successfully!</span>
      </div>
    );

  return (
    <>
      {showError()}
      {showSuccess()}
      <form className="lg:p-16 p-6" onSubmit={handleSubmit}>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Classes Name</label>
          <input
            type="text"
            className="block w-full px-4 py-2 border rounded"
            value={product_name}
            onChange={onHandleChange("product_name")}
            required
          />
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Fee</label>
          <input
            type="number"
            className="block w-full px-4 py-2 border rounded"
            value={product_price}
            onChange={onHandleChange("product_price")}
            required
          />
        </div>
        {/* <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Quantity in Stock</label>
          <input
            type="number"
            className="block w-full px-4 py-2 border rounded"
            value={countInStock}
            onChange={onHandleChange("countInStock")}
            required
          />
        </div> */}
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Duration</label>
          <input
            type="text"
            className="block w-full px-4 py-2 border rounded"
            value={duration}
            onChange={onHandleChange("duration")}
            placeholder="e.g., 2 months, 6 weeks"
            required
          />
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Instructor</label>
          <input
            type="text"
            className="block w-full px-4 py-2 border rounded"
            value={instructor}
            onChange={onHandleChange("instructor")}
            placeholder="Instructor's name"
            required
          />
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Schedule</label>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Day (e.g., Monday)"
              className="block w-full px-4 py-2 border rounded"
              value={scheduleInput.day}
              onChange={(e) => setScheduleInput({ ...scheduleInput, day: e.target.value })}
            />
            <input
              type="text"
              placeholder="Time (e.g., 10:00 AM - 12:00 PM)"
              className="block w-full px-4 py-2 border rounded"
              value={scheduleInput.time}
              onChange={(e) => setScheduleInput({ ...scheduleInput, time: e.target.value })}
            />
            <button
              type="button"
              className="px-4 py-2 text-white bg-green-600 rounded"
              onClick={addSchedule}
            >
              Add
            </button>
          </div>
          <ul>
            {schedule.map((item, index) => (
              <li key={index} className="mb-2 text-sm text-gray-700">
                {item.day}: {item.time}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Class Description</label>
          <textarea
            className="block w-full px-4 py-2 border rounded"
            value={product_description}
            onChange={onHandleChange("product_description")}
            required
          ></textarea>
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Class Image</label>
          <input
            type="file"
            className="block w-full px-4 py-2 border rounded"
            onChange={onHandleImage}
            required
          />
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Category</label>
          <select
            className="block w-full px-4 py-2 border rounded"
            value={productCategory}
            onChange={onHandleChange("category")}
            required
          >
            <option value="">Select Category</option>
            {category.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <button className="w-full px-4 py-2 text-white bg-indigo-600 rounded">
          Submit
        </button>
      </form>
    </>
  );
};

export default Addproduct;
