import React from 'react';
import { CheckCircle, Calendar, Book, ArrowRight, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <span className="text-2xl font-bold text-pink-800">शिक्ष्यद्वार</span>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-pink-800 px-8 py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-full p-3">
                <CheckCircle className="h-16 w-16 text-pink-800" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Booking Successful!
            </h1>
            <p className="text-pink-100 text-lg">
              Welcome to Shikshyadwar Learning Journey
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-10">
            {/* Next Steps */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  What's Next?
                </h2>
                <p className="text-gray-600">
                  Here's what you can expect from your online learning journey
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Email Confirmation */}
                <div className="bg-blue-50 rounded-2xl p-6 flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-pink-800 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Check Your Email
                    </h3>
                    <p className="text-gray-600 text-sm">
                      We've sent you a confirmation email with class details and login instructions
                    </p>
                  </div>
                </div>

                {/* Class Schedule */}
                <div className="bg-blue-50 rounded-2xl p-6 flex items-start space-x-4">
                  <Calendar className="h-6 w-6 text-pink-800 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Class Schedule
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Your class schedule and materials will be available in your dashboard
                    </p>
                  </div>
                </div>

                {/* Study Materials */}
                <div className="bg-blue-50 rounded-2xl p-6 flex items-start space-x-4">
                  <Book className="h-6 w-6 text-pink-800 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Access Materials
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Start exploring your course materials and resources
                    </p>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-blue-50 rounded-2xl p-6 flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-pink-800 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      24/7 Support
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Our support team is always here to help you succeed
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => navigate('/')}
                  className="flex justify-center bg-yellow-700 text-white py-3 px-6 rounded-xl font-medium hover:bg-yellow-800 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Go to Homepage</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;


