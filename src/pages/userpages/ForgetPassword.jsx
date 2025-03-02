// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgetPassword = () => {
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         try {
//             const response = await axios.post(`/api/forgetpassword`, { email });
//             setMessage(response.data.message);
//             setError("");
//         } catch (err) {
//             setError(err.response.data.error || "Something went wrong. Please try again");
//             setMessage("");
//         }
//         setIsLoading(false);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 flex items-center justify-center -mt-16 p-4">
//             <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
//                 {/* Decorative Elements */}
//                 <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-200 rounded-full opacity-50 blur-lg"></div>
//                 <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-300 rounded-full opacity-50 blur-lg"></div>
//                 <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-100 to-transparent opacity-40 rounded-full transform translate-x-16 -translate-y-16"></div>

//                 <div className="text-center mb-8 relative">
//                     {/* Sparkles */}
//                     <div className="absolute -top-2 left-12 text-pink-400 transform rotate-45">✦</div>
//                     <div className="absolute top-6 right-16 text-pink-300 transform -rotate-12">✦</div>
                    
//                     {/* Main Icon */}
//                     <div className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
//                         <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
//                         </svg>
//                     </div>

//                     <h2 className="text-3xl font-bold text-gray-800 mb-2">
//                         Forgot Password?
//                     </h2>
//                     <p className="text-gray-600 text-sm px-4">
//                         No worries! Enter your email and we'll send you reset instructions.
//                     </p>
//                 </div>

//                 {message && (
//                     <div className="mb-6 text-green-600 bg-green-50 border-2 border-green-200 p-4 rounded-xl flex items-center transform transition-all duration-300 hover:scale-102">
//                         <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         <span className="font-medium">{message}</span>
//                     </div>
//                 )}

//                 {error && (
//                     <div className="mb-6 text-red-600 bg-red-50 border-2 border-red-200 p-4 rounded-xl flex items-center transform transition-all duration-300 hover:scale-102">
//                         <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                         </svg>
//                         <span className="font-medium">{error}</span>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
//                     <div className="relative">
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                             Email Address
//                         </label>
//                         <div className="relative group">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <svg className="h-5 w-5 text-pink-400 group-hover:text-pink-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                                 </svg>
//                             </div>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 hover:border-pink-300 bg-white bg-opacity-80 backdrop-blur-sm"
//                                 placeholder="Enter your email"
//                                 required
//                             />
//                             <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-200 to-pink-300 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
//                         </div>
//                     </div>

//                     <button 
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
//                     >
//                         <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
//                         {isLoading ? (
//                             <div className="flex items-center justify-center">
//                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Processing...
//                             </div>
//                         ) : (
//                             "Send Reset Link"
//                         )}
//                     </button>

//                     <div className="text-center mt-4">
//                         <a href="#" className="text-sm text-pink-600 hover:text-pink-800 transition-colors duration-200 inline-flex items-center group">
//                             <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//                             </svg>
//                             Return to Login
//                         </a>
//                     </div>
//                 </form>

//                 {/* Bottom Decorative Wave */}
//                 <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 rounded-b-2xl"></div>
//             </div>
//         </div>
//     );
// };

// export default ForgetPassword;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Mail } from "lucide-react";
import loginImg from "../../assets/img/forget.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`/api/forgetpassword`, { email });

      toast.success(response.data.message, { position: "top-center" });
      setEmail(""); // Clear email field after success
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong. Please try again.", {
        position: "top-center",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      {/* Toast Notification Container */}
      <ToastContainer autoClose={3000} />

      <div className="bg-white rounded-2xl mt-0 mb-20 shadow-lg overflow-hidden w-full max-w-5xl flex min-h-[90vh]">
        {/* Left side - Illustration */}
        <div className="bg-blue-50 w-1/2 hidden md:flex items-center justify-center">
          <img src={loginImg} alt="Forgot Password" className="w-full h-full object-cover" />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-200 rounded-2xl">
                <Mail className="text-blue-600 w-8 h-8" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-blue-800 mb-2">Forgot Password?</h1>
            <p className="text-gray-600 mb-6">
              No worries! Enter your email and we'll send you reset instructions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                  placeholder="Enter your Email"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-2 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Send Reset Link"}
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  <Link to="/signin" className="text-blue-600 hover:underline font-medium">
                    ← Return to Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
