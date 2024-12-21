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