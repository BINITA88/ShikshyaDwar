import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../auth";
import { AlertCircle, CheckCircle, Upload, Plus, X, Clock, Calendar, Book, DollarSign, User } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const { product_name, product_price, product_description, product_image, category: productCategory, duration, schedule, instructor } = product;
  const { token } = isAuthenticated();

  useEffect(() => {
    axios
      .get(`/api/categorylist`)
      .then((res) => setCategory(res.data)) // Ensure data format is correct
      .catch((err) => {
        console.error(err);
        setError("Failed to load categories");
      });
  }, []);

  const onHandleChange = (name) => (e) => {
    setProduct({ ...product, [name]: e.target.value });
    setError("");
  };

  const onHandleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
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
    } else {
      setError("Both day and time are required for the schedule.");
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
    setIsSubmitting(true);
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= item ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {item}
            </div>
            {item < 3 && (
              <div className={`w-12 h-1 ml-4 ${step > item ? 'bg-indigo-600' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Add New Class</h2>
          <p className="mt-2 text-gray-600">Create an engaging learning experience</p>
        </div>

        {renderStepIndicator()}

        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 animate-fadeIn">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-green-50 border border-green-200 animate-fadeIn">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700">Class added successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900">Class Information</h3>
          </div>

          <div className="p-6 space-y-6">
            {/* Class Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Class Name</label>
              <input
                type="text"
                value={product_name}
                onChange={onHandleChange("product_name")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Fee */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Fee</label>
              <input
                type="number"
                value={product_price}
                onChange={onHandleChange("product_price")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Duration */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={onHandleChange("duration")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Instructor */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Instructor</label>
              <input
                type="text"
                value={instructor}
                onChange={onHandleChange("instructor")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Schedule */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Schedule</label>
              <div className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Day (e.g., Monday)"
                  value={scheduleInput.day}
                  onChange={(e) => setScheduleInput({ ...scheduleInput, day: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Time (e.g., 10:00 AM - 12:00 PM)"
                  value={scheduleInput.time}
                  onChange={(e) => setScheduleInput({ ...scheduleInput, time: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={addSchedule}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </button>
              </div>
              {schedule.length > 0 && (
                <div className="space-y-2">
                  {schedule.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
                      <span>{item.day}: {item.time}</span>
                      <button
                        type="button"
                        onClick={() => removeSchedule(index)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
               {/*DESCRIPTION*/}
               <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Course Description</label>
              <input
                type="text"
                value={product_description}
                onChange={onHandleChange("product_description")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={productCategory}
                onChange={onHandleChange("category")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Category</option>
                {category.map((item) => (
                  <option key={item._id} value={item._id}>{item.category_name}</option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Class Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={onHandleImage}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
              {imagePreview && <img src={imagePreview} alt="preview" className="mt-4 h-32 w-32 object-cover rounded-md" />}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
