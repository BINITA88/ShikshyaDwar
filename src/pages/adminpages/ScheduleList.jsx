import React from "react";

const ScheduleList = ({ schedules = [], onRemove }) => {  // Default to empty array if not passed
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-900">Schedule List</h2>
      {schedules.length === 0 ? (
        <p className="mt-4 text-gray-500">No schedules added yet.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {schedules.map((schedule, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-800">{schedule.subject}</p>
                <p className="text-sm text-gray-600">
                  {schedule.day} - {schedule.time}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-md ${
                    schedule.type === "active"
                      ? "bg-green-100 text-green-600"
                      : schedule.type === "paused"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {schedule.type}
                </span>
              </div>
              <button
                onClick={() => onRemove(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
