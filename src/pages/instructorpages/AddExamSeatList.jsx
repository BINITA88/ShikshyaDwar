import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth";
import { AlertCircle } from "lucide-react";
import axios from "axios";

const AddExamSeatList = () => {
  const [seatList, setSeatList] = useState([]);
  const [error, setError] = useState("");

  const { token } = isAuthenticated();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("/api/seat", config); // Adjust endpoint if necessary
        setSeatList(response.data);
      } catch (err) {
        setError("Failed to fetch seat list");
      }
    };

    fetchSeats();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Seat List</h2>
          <p className="mt-2 text-gray-600">View all available seats</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 animate-fadeIn">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {seatList.length > 0 ? (
          <ul className="space-y-4">
            {seatList.map((seat) => (
              <li
                key={seat.id}
                className="p-4 bg-white shadow rounded-md border border-gray-200"
              >
                <p className="text-sm font-medium text-gray-700">
                  Seat Number: {seat.seatNumber}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {seat.isBooked ? "Booked" : "Available"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No seats available.</p>
        )}
      </div>
    </div>
  );
};

export default AddExamSeatList;
