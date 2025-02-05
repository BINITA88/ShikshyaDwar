
import React, { useEffect, useState } from 'react';
import { Clock, Calendar } from 'lucide-react';

const Routine = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/schedules/getschedule')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.schedules)) {
          setSchedule(data.schedules);
        } else {
          console.log('Expected array of schedules, but got:', data.schedules);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (type) => {
    const colors = {
      active: 'bg-blue-100 border-blue-300 text-blue-900 hover:bg-blue-200',
      paused: 'bg-purple-100 border-purple-300 text-purple-900 hover:bg-purple-200',
      cancelled: 'bg-pink-100 border-pink-300 text-pink-900 hover:bg-pink-200',
      default: 'bg-gray-50 border-gray-100 text-gray-500'
    };
    return colors[type] || colors.default;
  };

  const getLegendColor = (type) => {
    const colors = {
      active: 'bg-blue-500',
      paused: 'bg-purple-500',
      cancelled: 'bg-pink-500'
    };
    return colors[type];
  };

  const times = [...new Set(schedule.map(item => item.time))].sort();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading schedule...</div>
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
              { type: 'active', label: 'Active Routine' },
              { type: 'paused', label: 'Paused Routine' },
              { type: 'cancelled', label: 'Cancelled Routine' }
            ].map(({ type, label }) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${getLegendColor(type)}`} />
                <span className="text-sm font-medium text-gray-600">{label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4">
            <div className="h-12" />
            {days.map(day => (
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

                {days.map(day => {
                  const course = schedule.find(
                    item => item.day === day && item.time === time
                  );
                  return (
                    <div
                      key={`${day}-${time}`}
                      className={`
                        border-2 rounded-lg p-3 transition-all
                        hover:shadow-md hover:scale-[1.02]
                        ${course ? getStatusColor(course.type) : 'bg-gray-50'}
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
