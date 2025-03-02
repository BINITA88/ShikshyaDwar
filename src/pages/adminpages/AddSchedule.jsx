import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Plus, X } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSchedule = () => {
  const [schedule, setSchedule] = useState({
    day: "",
    time: "",
    subject: "",
    type: "active",
  });
  const [scheduleList, setScheduleList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch schedules on mount
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const response = await axios.get("/api/schedules/getschedule", {
          headers: { "Content-Type": "application/json" },
        });
        setScheduleList(response.data.schedules || []);
      } catch (error) {
        // toast.error("Error fetching schedule list.");
      }
    };
    getSchedules();
  }, []);

  const onHandleChange = (name) => (e) => {
    setSchedule({ ...schedule, [name]: e.target.value });
  };

  const addScheduleToList = () => {
    const { day, time, subject, type } = schedule;
    if (day && time && subject) {
      setScheduleList([...scheduleList, { day, time, subject, type }]);
      setSchedule({ day: "", time: "", subject: "", type: "active" });
      toast.success("Schedule added!");
    } else {
      toast.error("All fields are required.");
    }
  };

  const removeSchedule = (index) => {
    setScheduleList(scheduleList.filter((_, i) => i !== index));
    toast.info("Schedule removed.");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (scheduleList.length === 0) {
      toast.error("Please add at least one schedule before submitting.");
      return;
    }
    setIsSubmitting(true);

    try {
      for (let schedule of scheduleList) {
        await axios.post("/api/schedules/addschedule", schedule, {
          headers: { "Content-Type": "application/json" },
        });
      }
      setScheduleList([]);
      toast.success("All schedules submitted successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Add New Schedule
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Day Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Day</label>
              <select
                value={schedule.day}
                onChange={onHandleChange("day")}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Select Day</option>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                value={schedule.time}
                onChange={onHandleChange("time")}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Subject & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                value={schedule.subject}
                onChange={onHandleChange("subject")}
                placeholder="Enter Subject Name"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Schedule Type</label>
              <select
                value={schedule.type}
                onChange={onHandleChange("type")}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Schedule List */}
          {scheduleList.length > 0 && (
            <div className="mt-6 space-y-4">
              {scheduleList.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md"
                >
                  <span className="text-gray-700">
                    {item.day} - {item.time} - {item.subject} ({item.type})
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSchedule(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={addScheduleToList}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Schedule
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
              {isSubmitting ? "Submitting..." : "Submit All"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;
