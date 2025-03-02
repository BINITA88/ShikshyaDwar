// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Mail, Lock, User, CheckCircle2, AlertCircle, Cloud } from 'lucide-react';

// const Register = () => {
//   const [values, setValue] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     error: "",
//     success: false,
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const { name, email, password, confirmPassword, error, success } = values;

//   const handleChange = name => event => {
//     setValue({ ...values, error: false, [name]: event.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setValue({ ...values, error: "Passwords do not match" });
//       return;
//     }
//     setIsLoading(true);
//     setValue({ ...values, error: "", success: false });

//     setTimeout(() => {
//       setIsLoading(false);
//       setValue({
//         ...values,
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         error: "",
//         success: true,
//       });
//     }, 1500);
//   };

//   return (
//     <div className="min-h-auto  bg-gradient-to-r from-blue-200 to-pink-300 relative overflow-hidden">
//       {/* Decorative Clouds */}
//       <div className="absolute inset-0 mt-3 overflow-hidden pointer-events-none">
//         <Cloud className="absolute text-white/20 top-20 left-10 w-16 h-16 animate-pulse" />
//         <Cloud className="absolute text-white/20 top-40 right-20 w-12 h-12 animate-pulse delay-300" />
//         <Cloud className="absolute text-white/20 bottom-20 left-1/4 w-20 h-20 animate-pulse delay-500" />
//       </div>

//       <div className="flex min-h-screen items-center justify-center">
      

//         {/* Right Side - Form */}
//         <div className="w-full lg:w-1/2  mb-48 flex items-center justify-center p-6 bg-white/90 backdrop-blur-md">
//           <div className="max-w-md w-full space-y-6">
//             {/* Header */}
//             <div className="text-center">
//               <div className="mx-auto h-14 w-14 bg-gradient-to-r from-pink-700 to-yellow-600 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-all duration-300 shadow-lg">
//                 <User className="h-7 w-7 text-white" />
//               </div>
//               <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
//                 Create your account
//               </h2>
//               <p className=" text-sm text-gray-600">
//                 Start your amazing journey with us today
//               </p>
//             </div>

//             {/* Alerts */}
//             {error && (
//               <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-lg flex items-center animate-fadeIn">
//                 <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             )}

//             {success && (
//               <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-lg flex items-center animate-fadeIn">
//                 <CheckCircle2 className="h-5 w-5 text-green-400 mr-3" />
//                 <p className="text-sm text-green-700">Account created successfully! Please verify your email.</p>
//               </div>
//             )}

//             {/* Form */}
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <div className="space-y-3">
//                 {/* Name Input */}
//                 <div className="group">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <User className="absolute top-2 left-3 h-5 w-5 text-gray-400 group-focus-within:text-sky-300" />
//                     <input
//                       id="name"
//                       name="name"
//                       type="text"
//                       required
//                       value={name}
//                       onChange={handleChange('name')}
//                       className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                 </div>

//                 {/* Email Input */}
//                 <div className="group">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email address
//                   </label>
//                   <div className="relative">
//                     <Mail className="absolute top-2 left-3 h-5 w-5 text-gray-400 group-focus-within:text-sky-500" />
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       required
//                       value={email}
//                       onChange={handleChange('email')}
//                       className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                 </div>

//                 {/* Password Input */}
//                 <div className="group">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <Lock className="absolute top-2 left-3 h-5 w-5 text-gray-400 group-focus-within:text-sky-500" />
//                     <input
//                       id="password"
//                       name="password"
//                       type="password"
//                       required
//                       value={password}
//                       onChange={handleChange('password')}
//                       className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//                       placeholder="••••••••"
//                     />
//                   </div>
//                 </div>

//                 {/* Confirm Password Input */}
//                 <div className="group">
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <Lock className="absolute top-2 left-3 h-5 w-5 text-gray-400 group-focus-within:text-sky-500" />
//                     <input
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       type="password"
//                       required
//                       value={confirmPassword}
//                       onChange={handleChange('confirmPassword')}
//                       className="pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 focus:outline-none sm:text-sm"
//                       placeholder="••••••••"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Terms and Submit */}
//               <div className="flex items-center space-x-2">
//                 <input
//                   id="terms"
//                   name="terms"
//                   type="checkbox"
//                   required
//                   className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
//                 />
//                 <label htmlFor="terms" className="text-sm text-gray-900">
//                   I agree to the{' '}
//                   <Link to="#" className="font-medium text-sky-600 hover:text-sky-500">
//                     Terms of Service
//                   </Link>{' '}
//                   and{' '}
//                   <Link to="#" className="font-medium text-sky-600 hover:text-sky-500">
//                     Privacy Policy
//                   </Link>
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-2 px-4 text-sm font-semibold text-white bg-gradient-to-r from-blue-800 to-blue-800 rounded-lg shadow-lg disabled:opacity-70"
//               >
//                 {isLoading ? 'Loading...' : 'Sign Up'}
//               </button>
//             </form>

//             {/* Footer */}
//             <div className="text-center text-sm text-gray-500">
//               Already have an account?{' '}
//               <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-500">
//                 Log In
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
// import React,{useState} from 'react'
// import { Link } from 'react-router-dom'
// import { signup } from '../../auth'

//     const Register = () => {
//     const[values,setValue]= useState({
//         name:"",
//         email:"",
//         password:"",
//         error:"",
//         success:false,
//     })


//     const {name,email,password,error,success}=values
    
//     const onhandleChange =name =>event =>{
//         setValue({...values,error:false,[name]:event.target.value})
//     }


//     const handleSubmit =(e) =>{
//     e.preventDefault ()
//     setValue({...values,error:"",success:false});

//     // function lekhni 
//     signup ({name,password,email})
//     // successful cha bahne then huncha nabhaya catch 
//     .then((data)=>{
//     if(data.error){
//     // handle case when there is an error in the response
//     setValue({...values,error:data.error,success:false})

//     }else{
//     // sucessful login 
//     setValue({
//         ...values,
//         name:"",
//         email:"",
//         password:"",
//         error:"",
//         success:true,

//     })
// }
//     })
//     .catch(err=>{
//         setValue({...values,error:"something went wrong.plase try again",success:false})
//         console.error(err)
//     })  // success login 
                
//     }

//     //  to show error message
//     const showError =()=>{
//         return(
//             <div className='bg-red-100 text-red-800 p-4 rounded-lg' style={{display:error ?
//                 "":'none' }} role='alert'>
//                     <strong className='font-bold text-sm mr-2'>Error!</strong>
//                     <span className='block text-sm sm:inline max-sm:mt-2'>{error}</span>
//                 </div>
          
//         )
//     }

//    const showSuccess=()=>{
//     return(
//         <div className='bg-green-100 text-green-800 p-4 rounded-lg' style={{display:success?
//             "":'none' }} role='alert'>
//                 <strong className='font-bold text-sm mr-2'>Success!</strong>
//                 <span className='block text-sm sm:inline max-sm:mt-2'>Your account has been Created successfully.kindly verify your email </span>
//             </div>
//     )
//    }
    
//   return (
//    <>
//    <section className="bg-gray-50 dark:bg-gray-900 my-20">
//   <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  
//       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                   Create an account
//               </h1>
//               {showError()}
//               {showSuccess()}
//               <form className="space-y-4 md:space-y-6" action="#">
//               <div>
//                       <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name </label>
//                       <input type="name" name="name" id="name"
//                        onChange={onhandleChange('name')}
//                        value={name}

//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your first name" required=""/>
//                   </div>
                  
//                   <div>
//                       <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                       <input type="email" name="email" id="email" 
                      
//                       onChange={onhandleChange('email')}
//                       value={email}
                      
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
//                   </div>
//                   <div>
//                       <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                       <input type="password" name="password" id="password" 
//                     //   onchange works starts from here
//                     onChange={onhandleChange('password')}
//                     value={password}
                      
//                       placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
//                   </div>
//                   <div>
//                       <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
//                       <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
//                   </div>
//                   <div className="flex items-start">
//                       <div className="flex items-center h-5">
//                         <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
//                       </div>
//                       <div className="ml-3 text-sm">
//                         <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to="#">Terms and Conditions</Link></label>
//                       </div>
//                   </div>
//                   <button type="submit" 
//                   onClick={handleSubmit}
                  
//                   className="w-full text-black bg-primary-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
//                   <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                       Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
//                   </p>
//               </form>
//           </div>
//       </div>
//   </div>
// </section>
//    </>
//   )
// }

// export default Register
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Heart } from "lucide-react";
// import philosophyImg from "../../assets/img/register1.png";
// import { signup } from '../../auth'

// const Register = () => {
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//     error: "",
//     success: false,
//   });

//   const { name, email, password, error, success } = values;

//   const onHandleChange = (field) => (event) => {
//     setValues({ ...values, error: false, [field]: event.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setValues({ ...values, error: "", success: false });

//     try {
//       const data = await signup({ name, password, email });

//       if (data.error) {
//         setValues({ ...values, error: data.error, success: false });
//       } else {
//         setValues({
//           name: "",
//           email: "",
//           password: "",
//           error: "",
//           success: true,
//         });
//       }
//     } catch (err) {
//       setValues({
//         ...values,
//         error: "Something went wrong. Please try again.",
//         success: false,
//       });
//       console.error(err);
//     }
//   };

//   return (
// <div className="flex h-auto  bg-indigo-900 w-auto">
// {/* Left side - Image */}
//       <div className="hidden lg:block w-1/2 h-auto relative">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
//         <img src={philosophyImg} alt="Registration" className="w-full h-full object-cover" />
//       </div>

//       {/* Right side - Form */}
//       <div className="w-full lg:w-1/2 flex mt-6 mb-8 items-center justify-center px-8">
//         <div className="w-full max-w-md mt- 9 space-y-6">
//           {/* Header */}
//           <div className="text-center">
//             <div className="flex mt- 9 justify-center mb-2">
//               <Heart className="text-pink-200 w-8 h-8" />
//             </div>
//             <h2 className="text-2xl font-bold text-white">Create Account</h2>
//             <p className="mt-1 text-gray-400">Join us and start your journey ✨</p>
//           </div>

//           {/* Alerts */}
//           {error && (
//             <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
//               <strong>Error!</strong> {error}
//             </div>
//           )}
//           {success && (
//             <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm">
//               <strong>Success!</strong> Your account has been created. Please verify your email.
//             </div>
//           )}

//           {/* Form */}
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm text-gray-300">Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={onHandleChange("name")}
//                 className="w-full px-4 py-2 bg-blue-100 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-300">Email Address</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={onHandleChange("email")}
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
//                 onChange={onHandleChange("password")}
//                 className="w-full px-4 py-2 bg-blue-100 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//             <div className="flex items-center">
//               <input type="checkbox" required className="h-4 w-4 text-blue-500 border-gray-600 rounded bg-pink-700" />
//               <label className="ml-2 text-sm text-gray-300">
//                 I agree to the <Link to="#" className="text-blue-500">Terms and Conditions</Link>
//               </label>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 text-white bg-pink-800 hover:bg-pink-700 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
//             >
//               Create Account
//             </button>
//             <p className="text-center text-sm text-gray-400">
//               Already have an account? <Link to="/login" className="text-blue-500">Sign in</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Heart } from "lucide-react";
// import philosophyImg from "../../assets/img/register1.png";


// import { signup } from '../../auth'

// const Register = () => {
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//     error: "",
//     success: false,
//   });

//   const { name, email, password, error, success } = values;

//   const onHandleChange = (field) => (event) => {
//     setValues({ ...values, error: false, [field]: event.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setValues({ ...values, error: "", success: false });

//     try {
//       const data = await signup({ name, password, email });

//       if (data.error) {
//         setValues({ ...values, error: data.error, success: false });
//       } else {
//         setValues({
//           name: "",
//           email: "",
//           password: "",
//           error: "",
//           success: true,
//         });
//       }
//     } catch (err) {
//       setValues({
//         ...values,
//         error: "Something went wrong. Please try again.",
//         success: false,
//       });
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 w-full">
//       {/* Left side - Image */}
//       <div className="lg:block w-1/2 h-auto relative">
//         <img src={philosophyImg} alt="Registration" className="w-full h-full object-cover" />
//       </div>

//       {/* Right side - Form */}
//       <div className="w-full lg:w-1/2 flex mt-0 mb-7 items-center justify-center px-8">
//         <div className="w-full max-w-md space-y-6 relative">
//           {/* Decorative Elements */}
//           <div className="absolute -top-1 -left-4 w-24 h-24 bg-pink-200 rounded-full opacity-50 blur-lg"></div>
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
//             <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
//             <p className="mt-2 text-gray-600">Join us and start your journey ✨</p>
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
//           {success && (
//             <div className="mb-6 text-green-600 bg-green-50 border-2 border-green-200 p-4 rounded-xl flex items-center">
//               <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <span className="font-medium">Your account has been created. Please verify your email.</span>
//             </div>
//           )}

//           {/* Form */}
//           <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
//             <div className="relative group">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-pink-400 group-hover:text-pink-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={onHandleChange("name")}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 hover:border-pink-300 bg-white bg-opacity-80 backdrop-blur-sm"
//                   placeholder="Enter your name"
//                   required
//                 />
//               </div>
//             </div>

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
//                   onChange={onHandleChange("email")}
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
//                   onChange={onHandleChange("password")}
//                   className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 hover:border-pink-300 bg-white bg-opacity-80 backdrop-blur-sm"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 required
//                 className="w-4 h-4 border-2 border-pink-200 rounded bg-white focus:ring-2 focus:ring-pink-500"
//               />
//               <label className="ml-2 text-sm text-gray-600">
//                 I agree to the <Link to="#" className="text-pink-600 hover:text-pink-700">Terms and Conditions</Link>
//               </label>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 relative overflow-hidden group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
//               Create Account
//             </button>

//             <p className="text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link to="/login" className="text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200">
//                 Sign in
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import philosophyImg from "../../assets/img/register12.png";
import { signup } from '../../auth';

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = values;

  const onHandleChange = (field) => (event) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signup({ name, password, email });

      if (data.error) {
        toast.error(data.error);
      } else {
        setValues({ name: "", email: "", password: "" });
        toast.success("Account created successfully! Please verify your email.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-lg mt-0 mb-20 overflow-hidden w-full max-w-5xl flex min-h-[80vh]">
        
        {/* Left side - Illustration */}
        <div className="bg-blue-50 w-1/2 hidden md:flex items-center justify-center">
          <img src={philosophyImg} alt="Registration" className="w-full h-full object-cover" />
        </div>
        
        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Create Your Account</h1>
            <p className="text-gray-600 mb-6">Join us and explore a world of possibilities. Sign up now and start your journey with us! ✨</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={onHandleChange("name")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                  placeholder="Enter your Name"
                  required
                />
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={onHandleChange("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                  placeholder="Enter your Email"
                  required
                />
              </div>
              
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={onHandleChange("password")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                  placeholder="Create Password"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-2"
              >
                Sign up
              </button>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account? 
                  <Link to="/login" className="text-blue-600 hover:underline font-medium"> Sign in</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

