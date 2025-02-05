// import { API } from '../../config'

// import { useAuthContext } from "../context/AuthContext"


// FOR SIGN UP PAGE 
export const signup =user =>{

    return fetch(`/api/register`,{
    method:'POST',
    headers:{
    Accept:"application/json",
    "Content-Type":"application/json"
    
    },
    body:JSON.stringify(user)
    })
    .then(res=>{
    return res.json()
    })
    .catch(err => console.log(err))
    }
    


    // for sign in
    export const signin =user =>{

        return fetch(`/api/signin`,{
        method:'POST',
        headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
        
        },
        body:JSON.stringify(user)
        })
        .then(res=>{
        return res.json()
        })
        .catch(err => console.log(err))
        }
         


        //adhi authenticate cha bahne jwt token liyera auna paryo

// AUTHENTICATION AND TO STORE TOKEN IN LOCAL STORAGE
        export const authenticate =( data, next)=>{
            // const{setAuthUser} =useAuthContext()
            if(typeof window  !== 'undefined'){
             localStorage.setItem('jwt',JSON.stringify(data))
            //  context 
            
             next()
            //  setAuthUser(data)
            }
        }

        // redirect use by role after authenticate
        export const isAuthenticated =()=>{
            if(typeof window === 'undefined'){
                return false
            }
            if(localStorage.getItem('jwt')){
                return JSON.parse(localStorage.getItem('jwt'))

            }
            else{
                return false
            }
        }


        // signout

        export const signout = next =>{
            if(typeof window !== 'undefined'){
                localStorage.removeItem('jwt',JSON.stringify('jwt'))
                next()
                // back to signin page 
                return fetch (`/api/signout`,{
                    method:"POST"
                })
                .then(res =>{
                    console.log(`signout`,res)
                    next()
                })
                .catch(err => console.log(err))
            }
        }


