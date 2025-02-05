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
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../../auth'

    const Register = () => {
    const[values,setValue]= useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false,
    })


    const {name,email,password,error,success}=values
    
    const onhandleChange =name =>event =>{
        setValue({...values,error:false,[name]:event.target.value})
    }


    const handleSubmit =(e) =>{
    e.preventDefault ()
    setValue({...values,error:"",success:false});

    // function lekhni 
    signup ({name,password,email})
    // successful cha bahne then huncha nabhaya catch 
    .then((data)=>{
    if(data.error){
    // handle case when there is an error in the response
    setValue({...values,error:data.error,success:false})

    }else{
    // sucessful login 
    setValue({
        ...values,
        name:"",
        email:"",
        password:"",
        error:"",
        success:true,

    })
}
    })
    .catch(err=>{
        setValue({...values,error:"something went wrong.plase try again",success:false})
        console.error(err)
    })  // success login 
                
    }

    //  to show error message
    const showError =()=>{
        return(
            <div className='bg-red-100 text-red-800 p-4 rounded-lg' style={{display:error ?
                "":'none' }} role='alert'>
                    <strong className='font-bold text-sm mr-2'>Error!</strong>
                    <span className='block text-sm sm:inline max-sm:mt-2'>{error}</span>
                </div>
          
        )
    }

   const showSuccess=()=>{
    return(
        <div className='bg-green-100 text-green-800 p-4 rounded-lg' style={{display:success?
            "":'none' }} role='alert'>
                <strong className='font-bold text-sm mr-2'>Success!</strong>
                <span className='block text-sm sm:inline max-sm:mt-2'>Your account has been Created successfully.kindly verify your email </span>
            </div>
    )
   }
    
  return (
   <>
   <section className="bg-gray-50 dark:bg-gray-900 my-20">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              {showError()}
              {showSuccess()}
              <form className="space-y-4 md:space-y-6" action="#">
              <div>
                      <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name </label>
                      <input type="name" name="name" id="name"
                       onChange={onhandleChange('name')}
                       value={name}

                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your first name" required=""/>
                  </div>
                  
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" 
                      
                      onChange={onhandleChange('email')}
                      value={email}
                      
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" 
                    //   onchange works starts from here
                    onChange={onhandleChange('password')}
                    value={password}
                      
                      placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to="#">Terms and Conditions</Link></label>
                      </div>
                  </div>
                  <button type="submit" 
                  onClick={handleSubmit}
                  
                  className="w-full text-black bg-primary-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
   </>
  )
}

export default Register