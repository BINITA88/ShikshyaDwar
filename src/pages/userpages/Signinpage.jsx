import React,{useEffect, useState}from 'react'
import { Link,redirect,useNavigate} from 'react-router-dom'
import { signin ,authenticate,isAuthenticated } from '../../auth'

const Signinpage = () => {
    const navigate =useNavigate()
    const {user} =isAuthenticated()

    const[values,setValues]= useState({
        email:"",
        password:"",
        error:"",
        redirectToPage:false,
    })


    const {email,password,error,redirectToPage}=values
    
    const onhandleChange =name =>event =>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const handleSubmit =(e) =>{
    e.preventDefault ()
    // form ma action cha probelm aucha bahnera prevent default gareko
    setValues({...values,error:"",success:false});

    // function lekhni 
    signin ({password,email})
    // successful cha bahne then huncha nabhaya catch 
    .then((data)=>{
    if(data.error){
    // handle case when there is an error in the response
    setValues({...values,error:data.error})

    }else{
    // sucessful login 
    authenticate(data,()=>{
        setValues({...values ,redirectToPage:true})
    })
}
    })
    .catch(err=>{
        console.log(err)
    })  // success login 
                
    }


    useEffect(()=>{
        if(redirectToPage){
            if(user && user.role ==1){
                navigate('/admin');
            }else{
                navigate('/')
            }
        }
    },[redirectToPage,navigate,user])
    
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

  

  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              {showError()}
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email"
                      onChange={onhandleChange('email')}
                      values={email}

                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password"
                      
                      onChange={onhandleChange('password')}
                      values={password}
                      
                      placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <Link to="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleSubmit}
                  >Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link to="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default Signinpage