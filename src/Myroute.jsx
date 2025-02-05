
// export default Myroute
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/usercomponents/Layout';
import HomePages from './pages/userpages/HomePages';
import Product from './pages/userpages/Product';
import Dashboard from './pages/adminpages/Dashboard';
import AdminHeader from './components/admincomponents/AdminHeader';
import Addproduct from './pages/adminpages/Addproduct';
import ProductList from './pages/adminpages/ProductList';
import Register from './pages/userpages/Register';
import Signinpage from './pages/userpages/Signinpage';
import CategoryList from './pages/adminpages/CategoryList';
import Addcategory from './pages/adminpages/Addcategory';
import EmailVerify from './auth/EmailVerify';
import Applying from './components/usercomponents/Applying';
import UpdateProduct from './pages/adminpages/UpdateProduct';
import ProductDetail from './pages/userpages/ProductDetail';
import Booking from './pages/userpages/Booking';
import ConfirmBooking from './pages/userpages/ConfirmBooking';
import PaymentElement from './pages/userpages/PaymentElement';
import Success from './pages/userpages/Success';
import StudentDetails from './pages/adminpages/Student';
import InstructorHeader from './components/Intructorcomponents/InstructorHeader';
import IntructorDashboard from './pages/instructorpages/IntructorDashboard';
import AddMessages from './pages/instructorpages/AddMessages';
import MessageList from './pages/instructorpages/MessageList';
import Home from './pages/userpages/Home';
import AddExamSeat from './pages/instructorpages/AddExamSeat';
import AddExamSeatList from './pages/instructorpages/AddExamSeatList';
import Routine from './pages/userpages/Routine';
import AddSchedule from './pages/adminpages/AddSchedule';
import ScheduleList from './pages/adminpages/ScheduleList';
import Notice from './components/usercomponents/Notice';



function Myroute() {
  return (
    <Router>
      <Routes>
        {/* route for admin pages */}
        
        <Route path='/admin' element={<AdminHeader/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='addproduct' element={<Addproduct />} />
        <Route path='productlist' element={<ProductList/>} />
        <Route path='categorylist' element={<CategoryList/>} />
        <Route path='updateproduct/:productId' element={<UpdateProduct/>} />
        <Route path='addcategory' element={<Addcategory/>} />
        <Route path='students' element={<StudentDetails/>} />
        <Route path='addschedule' element={<AddSchedule/>} />
        <Route path='schedulelist' element={<ScheduleList/>} />
        </Route>
{/* need to fix in email one
 */}
{/* for instructor dashboard */}
        
<Route path='/instructor' element={<InstructorHeader/>}>
<Route index element={<IntructorDashboard/>}/>
<Route path='addmessages' element={<AddMessages />} />
<Route path='messageslist' element={<MessageList/>} />
<Route path='addseat' element={<AddExamSeat />} />
<Route path='seatlist' element={<AddExamSeatList/>} />
<Route path='student' element={<StudentDetails/>} />
</Route>




 {/* capture values from the URL and use them in your application. */}
 
        <Route path='success' element={<Success/>}/>
        {/* route for user page */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePages />} />
          <Route path='payment' element={<PaymentElement/>}/>
          <Route path='register' element={<Register/>} />
          <Route path='login' element={<Signinpage/>} />
          <Route path='product' element={<Product />} />
          <Route path='productdetail/:productId' element={<ProductDetail />} />
          <Route path='apply' element={<Applying />} />
          <Route path='Booking' element={<Booking/>} />
          <Route path='email/confirmation/:token' element={<EmailVerify/>} />
          <Route path='confirm' element={<ConfirmBooking/>} />  
          <Route path='conversation' element={<Home/>} />  
          <Route path='routine' element={<Routine/>} />  
          <Route path='notice' element={<Notice/>} />  
        </Route>
      </Routes>
    </Router>
  );
}

export default Myroute;
