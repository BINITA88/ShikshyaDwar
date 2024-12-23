
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
{/* need to fix in email one
 */}
 {/* capture values from the URL and use them in your application. */}
        
        
        </Route>
        {/* route for user page */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePages />} />
          <Route path='register' element={<Register/>} />
          <Route path='login' element={<Signinpage/>} />
          <Route path='product' element={<Product />} />

          <Route path='productdetail/:productId' element={<ProductDetail />} />
          <Route path='apply' element={<Applying />} />
          <Route path='Booking' element={<Booking/>} />
          <Route path='email/confirmation/:token' element={<EmailVerify/>} />
          <Route path='confirm' element={<ConfirmBooking/>} />


          
        </Route>
      </Routes>
    </Router>
  );
}

export default Myroute;
