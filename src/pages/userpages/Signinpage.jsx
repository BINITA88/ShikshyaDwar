// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signin, authenticate, isAuthenticated } from "../../auth";
// import { Heart } from "lucide-react";
// import loginImg from "../../assets/img/i2.png"; // Use the same image as Register

// const Signinpage = () => {
//   const navigate = useNavigate();
//   const { user } = isAuthenticated();

//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//     error: "",
//     redirectToPage: false,
//   });

//   const { email, password, error, redirectToPage } = values;

//   const onhandleChange = (name) => (event) => {
//     setValues({ ...values, error: false, [name]: event.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setValues({ ...values, error: "", success: false });

//     signin({ password, email })
//       .then((data) => {
//         if (data.error) {
//           setValues({ ...values, error: data.error });
//         } else {
//           authenticate(data, () => {
//             setValues({ ...values, redirectToPage: true });
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     if (redirectToPage) {
//       if (user && user.role === 1) {
//         navigate("/admin");
//       } else if (user && user.role === 2) {
//         navigate("/instructor");
//       } else {
//         navigate("/");
//       }
//     }
//   }, [redirectToPage, navigate, user]);

//   return (
//     <div className="flex bg-indigo-900 w-full">
//       {/* Left side - Image */}
//       <div className="hidden lg:block w-1/2 h-auto relative">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
//         <img src={loginImg} alt="Login" className="w-full h-full object-cover" />
//       </div>

//       {/* Right side - Form */}
//       <div className="w-full lg:w-1/2 mb-20 flex  items-center justify-center px-8">
//         <div className="w-full max-w-md mt-11 space-y-6">
//           {/* Header */}
//           <div className="text-center">
//             <div className="flex mt-2 justify-center mb-2">
//               <Heart className="text-pink-200 w-8 h-8" />
//             </div>
//             <h2 className="text-2xl font-bold text-white">Sign in to your Account</h2>
//             <p className="mt-1 text-gray-400">Welcome back! Let's get you started 🚀</p>
//           </div>

//           {/* Alerts */}
//           {error && (
//             <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
//               <strong>Error!</strong> {error}
//             </div>
//           )}

//           {/* Form */}
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm text-gray-300">Email Address</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={onhandleChange("email")}
//                 className="w-full px-4 py-2 bg-blue-100 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-300">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={onhandleChange("password")}
//                 className="w-full px-4 py-2 bg-blue-100 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//             <div className="flex items-center justify-between">
//                       <div className="flex items-start">
//                           <div className="flex items-center h-5">
//                             <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
//                           </div>
//                           <div className="ml-3 text-sm">
//                             <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
//                           </div>
//                       </div>
//                       <Link to="/forget" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>                  </div>
//             <button
//               type="submit"
//               className="w-full py-2 text-white bg-pink-800 hover:bg-pink-700 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
//             >
//               Sign in
//             </button>
//             <p className="text-center text-sm text-gray-400">
//               Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signinpage;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signin, authenticate, isAuthenticated } from "../../auth";
// import { Heart } from "lucide-react";
// import loginImg from "../../assets/img/i2.png";

// const Signinpage = () => {
//   const navigate = useNavigate();
//   const { user } = isAuthenticated();

//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//     error: "",
//     redirectToPage: false,
//   });

//   const { email, password, error, redirectToPage } = values;

//   const onhandleChange = (name) => (event) => {
//     setValues({ ...values, error: false, [name]: event.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setValues({ ...values, error: "", success: false });

//     signin({ password, email })
//       .then((data) => {
//         if (data.error) {
//           setValues({ ...values, error: data.error });
//         } else {
//           authenticate(data, () => {
//             setValues({ ...values, redirectToPage: true });
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     if (redirectToPage) {
//       if (user && user.role === 1) {
//         navigate("/admin");
//       } else if (user && user.role === 2) {
//         navigate("/instructor");
//       } else {
//         navigate("/");
//       }
//     }
//   }, [redirectToPage, navigate, user]);

//   return (
//     <div className="flex bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 w-full">
//       {/* Left side - Image */}
//       <div className="lg:block w-1/2 h-auto relative">
//         <img src={loginImg} alt="Login" className="w-full h-full object-cover" />
//       </div>

//       {/* Right side - Form */}
//       <div className="w-full lg:w-1/2 flex  mt-0 mb-7  items-center justify-center px-8">
//         <div className="w-full max-w-md space-y-6 relative">
//           {/* Decorative Elements */}
//           <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-200 rounded-full opacity-50 blur-lg"></div>
//           <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-300 rounded-full opacity-50 blur-lg"></div>
          
//           {/* Header */}
//           <div className="text-center relative">
//             <div className="absolute -top-2 left-12 text-pink-400 transform rotate-45">✦</div>
//             <div className="absolute top-6 right-16 text-pink-300 transform -rotate-12">✦</div>
            
//             <div className="flex justify-center mb-4">
//               <div className="p-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
//                 <Heart className="text-pink-600 w-8 h-8" />
//               </div>
//             </div>
//             <h2 className="text-3xl font-bold text-gray-800">Sign in to your Account</h2>
//             <p className="mt-2 text-gray-600">Welcome back! Let's get you started 🚀</p>
//           </div>

//           {/* Alerts */}
//           {error && (
//             <div className="mb-6 text-red-600 bg-red-50 border-2 border-red-200 p-4 rounded-xl flex items-center">
//               <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           {/* Form */}
//           <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
//             <div className="relative group">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-pink-400 group-hover:text-pink-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                   </svg>
//                 </div>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={onhandleChange("email")}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 hover:border-pink-300 bg-white bg-opacity-80 backdrop-blur-sm"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="relative group">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-pink-400 group-hover:text-pink-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={onhandleChange("password")}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 hover:border-pink-300 bg-white bg-opacity-80 backdrop-blur-sm"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-start">
//                 <div className="flex items-center h-5">
//                   <input
//                     id="remember"
//                     type="checkbox"
//                     className="w-4 h-4 border-2 border-pink-200 rounded bg-white focus:ring-2 focus:ring-pink-500"
//                   />
//                 </div>
//                 <div className="ml-3 text-sm">
//                   <label htmlFor="remember" className="text-gray-600">Remember me</label>
//                 </div>
//               </div>
//               <Link to="/forget" className="text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors duration-200">
//                 Forgot password?
//               </Link>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 relative overflow-hidden group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
//               Sign in
//             </button>

//             <p className="text-center text-sm text-gray-600">
//               Don't have an account?{" "}
//               <Link to="/register" className="text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200">
//                 Sign up
//               </Link>
//             </p>
//           </form>

//           {/* Bottom Decorative Wave */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signinpage;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../../auth";
import { BookOpen, Lock, Mail } from "lucide-react";
import loginImg from "../../assets/img/login123.png";
import toast, { Toaster } from "react-hot-toast"; // ✅ Import Toast

const Signinpage = () => {
  const navigate = useNavigate();
  const { user } = isAuthenticated();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    redirectToPage: false,
  });

  const { email, password, error, success, redirectToPage } = values;

  const onhandleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", success: false });

    signin({ password, email })
      .then((data) => {
        if (data.error) {
          toast.error(data.error); // ✅ Show error toast
          setValues({ ...values, error: data.error });
        } else {
          authenticate(data, () => {
            toast.success("Login successful! 🎉"); // ✅ Show success toast
            setValues({ ...values, success: "Login successful!", redirectToPage: true });
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again."); // ✅ Handle generic error
        console.log(err);
      });
  };

  // 🔄 Redirect based on user role after login
  useEffect(() => {
    if (redirectToPage) {
      if (user && user.role === 1) {
        navigate("/admin");
      } else if (user && user.role === 2) {
        navigate("/instructor");
      } else if (user && user.role === 3) {
        navigate("/student-dashboard");
      } else {
        navigate("/");
      }
    }
  }, [redirectToPage, navigate, user]);

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add Toast container */}

      <div className="bg-white rounded-2xl mt-0 mb-20 shadow-lg overflow-hidden w-full max-w-5xl flex min-h-[90vh]">
        {/* Left side - Illustration */}
        <div className="bg-blue-50 w-1/2 hidden md:flex items-center justify-center">
          <img src={loginImg} alt="Login" className="w-full h-full object-cover" />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-200 rounded-2xl">
                <BookOpen className="text-blue-600 w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Student Login</h1>
            <p className="text-gray-600 mb-6">
              Sign into your account to continue your studies and access exclusive resources tailored just for you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={onhandleChange("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                  placeholder="Enter your Email"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={onhandleChange("password")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                  placeholder="Enter your Password"
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link to="/forget" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-2"
              >
                Sign in
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?
                  <Link to="/register" className="text-blue-600 hover:underline font-medium"> Sign up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signinpage;
