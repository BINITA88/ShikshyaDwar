import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { isAutheticated } from '.'
const InstructorRole = () => {
    isAutheticated()&& isAutheticated().user.role ==2?
    <Outlet/>:(
     <Navigate to= '/signin'/>
    )
}

export default InstructorRole


// admin cha bahne 1 otherwise user cha bahne default:0 
// user role 0
//  here admin role is 1 
// instructor role 2 (new added one)