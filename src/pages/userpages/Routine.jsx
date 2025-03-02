import React, { useEffect, useState } from "react";
import { Clock, Calendar, AlertTriangle, Loader2, LogIn } from "lucide-react"; // Icons
import { isAuthenticated } from "../../auth"; // Authentication Check

const Routine = () => {
  const { token } = isAuthenticated(); // Get Auth Token
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      console.warn("⚠️ You will not see the routine until you complete full payment.");
      setLoading(false);
      return;
    }

    fetch("/api/schedules/getschedule", {
      headers: { Authorization: `Bearer ${token}` }, // Include authentication token
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.schedules)) {
          setSchedule(data.schedules);
        } else {
          console.log("Expected array of schedules, but got:", data.schedules);
          setError("⚠️ No routine available.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("❌ Error fetching the study routine.");
        setLoading(false);
      });
  }, [token]);

  const getStatusColor = (type) => {
    const colors = {
      active: "bg-blue-100 border-blue-300 text-blue-900 hover:bg-blue-200",
      paused: "bg-purple-100 border-purple-300 text-purple-900 hover:bg-purple-200",
      cancelled: "bg-pink-100 border-pink-300 text-pink-900 hover:bg-pink-200",
      default: "bg-gray-50 border-gray-100 text-gray-500",
    };
    return colors[type] || colors.default;
  };

  const getLegendColor = (type) => {
    const colors = {
      active: "bg-blue-500",
      paused: "bg-purple-500",
      cancelled: "bg-pink-500",
    };
    return colors[type];
  };

  const times = [...new Set(schedule.map((item) => item.time))].sort();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <main className="max-w-7xl mx-auto my-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Calendar className="w-8 h-8 text-yellow-600" />
            <h1 className="text-4xl font-bold text-gray-900">Study Routine</h1>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-lg text-gray-700 font-medium flex items-center gap-2">
              <AlertTriangle className="text-yellow-600 w-6 h-6" />
              You will not see the routine until you complete full payment.
            </p>
          </div>
        </main>
      </div>
    );
  }

  /** Loading State */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-14 h-14 text-gray-500 animate-spin mb-3" />
        <p className="text-lg text-gray-500 font-medium">⏳ Loading study routine...</p>
      </div>
    );
  }

  /** Error or No Routine Available */
  if (error || schedule.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
      <main className="max-w-7xl mx-auto my-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Calendar className="w-8 h-8 text-yellow-600" />
          <h1 className="text-4xl font-bold text-gray-900">Study Routine</h1>
        </div>

        {/* Unauthorized Message - Positioned Right Below Header */}
        <div className="flex flex-col items-center justify-center mt-4">
          <LogIn className="w-12 h-12 text-gray-600 mb-3" />
          <p className="text-lg text-gray-700 font-medium flex items-center gap-2">
            <AlertTriangle className="text-yellow-600 w-6 h-6" />
            You will not see the routine until you complete full payment.
          </p>
        </div>
      </main>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <main className="max-w-7xl mx-auto my-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Calendar className="w-8 h-8 text-yellow-600" />
          <h1 className="text-4xl font-bold text-gray-900">Study Routine</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {[
              { type: "active", label: "Active Routine" },
              { type: "paused", label: "Paused Routine" },
              { type: "cancelled", label: "Cancelled Routine" },
            ].map(({ type, label }) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${getLegendColor(type)}`} />
                <span className="text-sm font-medium text-gray-600">{label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4">
            <div className="h-12" />
            {days.map((day) => (
              <div key={day} className="h-12 flex items-center justify-center">
                <span className="font-semibold text-gray-700">{day}</span>
              </div>
            ))}

            {times.map((time) => (
              <React.Fragment key={time}>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{time}</span>
                </div>

                {days.map((day) => {
                  const course = schedule.find((item) => item.day === day && item.time === time);
                  return (
                    <div
                      key={`${day}-${time}`}
                      className={`
                        border-2 rounded-lg p-3 transition-all
                        hover:shadow-md hover:scale-[1.02]
                        ${course ? getStatusColor(course.type) : "bg-gray-50"}
                      `}
                    >
                      {course && (
                        <div className="space-y-1">
                          <div className="font-bold text-sm">{course.subject}</div>
                          <div className="text-xs">
                            {course.startTime} - {course.endTime}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Routine;
