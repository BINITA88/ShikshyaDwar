import React, { useState } from "react";
import { isAuthenticated } from "../../auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddExamSeat = () => {
  const [seatData, setSeatData] = useState({
    seatPrefix: "S",
    seatCount: 1,
    isBooked: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = isAuthenticated();

  // Handle input changes
  const onHandleChange = (name) => (e) => {
    const value = name === "isBooked" ? e.target.checked : e.target.value;
    setSeatData({ ...seatData, [name]: value });
  };

  // Submit seat data (bulk create)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const { seatPrefix, seatCount, isBooked } = seatData;
    const seatsToAdd = Array.from({ length: seatCount }, (_, i) => ({
      seatNumber: `${seatPrefix}${i + 1}`,
      isBooked,
    }));

    try {
      const response = await fetch("/api/seat/bulk-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seats: seatsToAdd }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong while adding seats.");
      }

      toast.success("Seats added successfully!");
      setSeatData({ seatPrefix: "S", seatCount: 1, isBooked: false });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 flex justify-center items-center">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8 border">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add Exam Seats
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seat Prefix */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Seat Prefix</label>
              <input
                type="text"
                value={seatData.seatPrefix}
                onChange={onHandleChange("seatPrefix")}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Number of Seats */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Seats</label>
              <input
                type="number"
                min="1"
                max="50"
                value={seatData.seatCount}
                onChange={onHandleChange("seatCount")}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Seat Status */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={seatData.isBooked}
              onChange={onHandleChange("isBooked")}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 text-sm font-medium">Mark as Booked</span>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-5 py-2 bg-pink-700 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : `Add ${seatData.seatCount} Seats`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExamSeat;
