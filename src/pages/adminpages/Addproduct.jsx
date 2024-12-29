import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../auth";
import { AlertCircle, CheckCircle, Upload, Plus, X } from "lucide-react";
import axios from "axios";

const AddProduct = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    product_image: "",
    category: "",
    duration: "",
    schedule: [],
    instructor: ""
  });
  const [scheduleInput, setScheduleInput] = useState({ day: "", time: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const { product_name, product_price, product_description, product_image, category: productCategory, duration, schedule, instructor } = product;
  const { token } = isAuthenticated();

  useEffect(() => {
    axios
      .get(`/api/categorylist`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onHandleChange = (name) => (e) => {
    setProduct({ ...product, [name]: e.target.value });
    setError("");
  };

  const onHandleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, product_image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addSchedule = () => {
    if (scheduleInput.day && scheduleInput.time) {
      setProduct({
        ...product,
        schedule: [...schedule, scheduleInput],
      });
      setScheduleInput({ day: "", time: "" });
    }
  };

  const removeSchedule = (index) => {
    setProduct({
      ...product,
      schedule: schedule.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(product).forEach(key => {
        if (key === 'schedule') {
          formData.append(key, JSON.stringify(product[key]));
        } else {
          formData.append(key, product[key]);
        }
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`/api/postproduct`, formData, config);
      setSuccess(true);
      setError("");
      setProduct({
        product_name: "",
        product_price: "",
        product_description: "",
        product_image: "",
        category: "",
        duration: "",
        schedule: [],
        instructor: "",
      });
      setImagePreview(null);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Add New Class</h2>
          <p className="mt-2 text-gray-600">Create a new class with detailed information</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-green-50 border border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700">Class added successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                value={product_name}
                onChange={onHandleChange("product_name")}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fee</label>
              <input
                type="number"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                value={product_price}
                onChange={onHandleChange("product_price")}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                value={duration}
                onChange={onHandleChange("duration")}
                placeholder="e.g., 2 months, 6 weeks"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                value={instructor}
                onChange={onHandleChange("instructor")}
                placeholder="Instructor's name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
            <div className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="Day (e.g., Monday)"
                className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                value={scheduleInput.day}
                onChange={(e) => setScheduleInput({ ...scheduleInput, day: e.target.value })}
              />
              <input
                type="text"
                placeholder="Time (e.g., 10:00 AM - 12:00 PM)"
                className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                value={scheduleInput.time}
                onChange={(e) => setScheduleInput({ ...scheduleInput, time: e.target.value })}
              />
              <button
                type="button"
                onClick={addSchedule}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {schedule.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <span className="text-sm text-gray-700">
                    {item.day}: {item.time}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSchedule(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Description</label>
            <textarea
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              rows="4"
              value={product_description}
              onChange={onHandleChange("product_description")}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="mb-4">
                    <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-auto rounded-md" />
                  </div>
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      onChange={onHandleImage}
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              value={productCategory}
              onChange={onHandleChange("category")}
              required
            >
              <option value="">Select Category</option>
              {category.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Create Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;