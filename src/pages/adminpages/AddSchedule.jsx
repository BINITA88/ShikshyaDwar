import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Plus, X } from "lucide-react";
import axios from "axios";

const AddSchedule = () => {
  const [schedule, setSchedule] = useState({
    day: "",
    time: "",
    subject: "",
    type: "active", // Default type
  });
  const [scheduleList, setScheduleList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { day, time, subject, type } = schedule;

  // Fetch schedules on mount
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const response = await axios.get("/api/schedules/getschedule", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setScheduleList(response.data.schedules || []);
      } catch (error) {
        setError("Error fetching schedule list.");
      }
    };

    getSchedules();
  }, []);

  const onHandleChange = (name) => (e) => {
    setSchedule({ ...schedule, [name]: e.target.value });
    setError(""); // Clear error on change
  };

  const addScheduleToList = () => {
    if (day && time && subject) {
      setScheduleList([...scheduleList, { day, time, subject, type }]);
      setSchedule({ day: "", time: "", subject: "", type: "active" });
      setError("");
    } else {
      setError("All fields are required.");
    }
  };

  const removeSchedule = (index) => {
    setScheduleList(scheduleList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
  
    if (scheduleList.length === 0) {
      setError("Please add at least one schedule before submitting.");
      return;
    }
  
    setIsSubmitting(true);
    try {
      for (let schedule of scheduleList) {
        const response = await axios.post(
          "/api/schedules/addschedule",
          schedule,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Schedule added:", response.data);
      }
      setSuccess(true);
      setScheduleList([]);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ScheduleListItem = ({ item, index }) => (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
      <span>
        {item.day}: {item.time} - {item.subject} ({item.type})
      </span>
      <button
        type="button"
        onClick={() => removeSchedule(index)}
        className="text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Add New Schedule</h2>
          <p className="mt-2 text-gray-600">Create a class schedule</p>
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
            <p className="text-sm text-green-700">Schedule added successfully!</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900">
              Schedule Information
            </h3>
          </div>

          <div className="p-6 space-y-6">
            {/* Day */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Day</label>
              <select
                value={day}
                onChange={onHandleChange("day")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
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

            {/* Time */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                value={time}
                onChange={onHandleChange("time")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={onHandleChange("subject")}
                placeholder="Subject Name"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Type */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Schedule Type</label>
              <select
                value={type}
                onChange={onHandleChange("type")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="p-6 bg-gray-50 space-y-4">
            <div className="space-y-4">
              {scheduleList.map((schedule, index) => (
                <ScheduleListItem key={index} item={schedule} index={index} />
              ))}
            </div>

            <button
              type="button"
              onClick={addScheduleToList}
              className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex justify-center items-center px-4 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isSubmitting ? 'Submitting...' : 'Submit All'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;
