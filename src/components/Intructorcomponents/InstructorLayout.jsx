import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAutheticated } from '../../auth';
import InstructorHeader from './InstructorHeader';

const AdminLayout = () => {
  if (!isAutheticated() || isAutheticated().user.role !== 2) {
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <InstructorHeader />
      <Outlet />

    </>
  )
}

export default AdminLayout
