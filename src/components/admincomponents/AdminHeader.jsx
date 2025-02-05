import React, { useState } from "react";
import { Link, Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { TbCategoryFilled } from "react-icons/tb";
import { isAuthenticated, signout } from "../../auth";
import { FaBookReader } from "react-icons/fa";
import { AiTwotoneSchedule } from "react-icons/ai";
const AdminHeader = () => {
  const [dropdowns, setDropdowns] = useState({
    course: false,
    category: false,
    routine: false,
  });
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated() || isAuthenticated().user.role !== 1) {
    return <Navigate to="/login" />;
  }

  const { user } = isAuthenticated();
  const navigate = useNavigate();

  const toggleDropdown = (key) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to get current page title based on path
  const getCurrentPageTitle = () => {
    switch (location.pathname) {
      case '/admin':
        return 'Dashboard';
      case '/admin/addproduct':
        return 'Add Course';
      case '/admin/productlist':
        return 'Course List';
      case '/admin/addcategory':
        return 'Add Category';
      case '/admin/categorylist':
        return 'Category List';
      case '/admin/addschedule':
        return 'Add Routine';
      case '/admin/schedulelist':
        return 'Routine List';
      case '/admin/students':
        return 'Students';
      default:
        return 'Dashboard';
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-pink-800 text-white sm:hidden hover:bg-pink-700 transition-colors duration-200"
      >
        <span className="sr-only">Toggle sidebar</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Top Header */}
      <div className="fixed h-24 top-0 right-0 left-0 sm:left-64 z-30 bg-gradient-to-r from-pink-800 to-pink-900 shadow-md">
        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold justify-center mt-5 text-white">{getCurrentPageTitle()}</h1>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-pink-800 to-pink-900 shadow-2xl">
          {/* Admin Profile Section */}
          <div className="p-6 border-b border-pink-700/50">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-pink-700 flex items-center justify-center">
                <span className="text-xl text-white font-semibold">
                  {user.name?.[0]?.toUpperCase() || 'A'}
                </span>
              </div>
              <div>
                <h2 className="text-white font-semibold">{user.name}</h2>
                <p className="text-pink-200 text-sm">Administrator</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              {/* Dashboard */}
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 group
                    ${isActive('/admin') 
                      ? 'bg-pink-700 text-white' 
                      : 'text-pink-100 hover:bg-pink-700/50'}`}
                >
                  <svg
                    className="w-5 h-5 transition-colors duration-200"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>

              {/* Course Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("course")}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200
                    ${dropdowns.course ? 'bg-pink-700 text-white' : 'text-pink-100 hover:bg-pink-700/50'}`}
                >
                  <div className="flex items-center">
                    <FaBookReader />
                    <span className="ms-3">Courses</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${dropdowns.course ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`mt-2 space-y-1 ${dropdowns.course ? 'block' : 'hidden'}`}>
                  <Link
                    to="/admin/addproduct"
                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
                      ${isActive('/admin/addproduct') 
                        ? 'bg-pink-700 text-white' 
                        : 'text-pink-100 hover:bg-pink-700/50'}`}
                  >
                    Add Course
                  </Link>
                  <Link
                    to="/admin/productlist"
                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
                      ${isActive('/admin/productlist') 
                        ? 'bg-pink-700 text-white' 
                        : 'text-pink-100 hover:bg-pink-700/50'}`}
                  >
                    Course List
                  </Link>
                </div>
              </li>

              {/* Category Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("category")}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200
                    ${dropdowns.category ? 'bg-pink-700 text-white' : 'text-pink-100 hover:bg-pink-700/50'}`}
                >
                  <div className="flex items-center">
                    <TbCategoryFilled className="w-5 h-5" />
                    <span className="ms-3">Categories</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${dropdowns.category ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`mt-2 space-y-1 ${dropdowns.category ? 'block' : 'hidden'}`}>
                  <Link
                    to="/admin/addcategory"
                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
                      ${isActive('/admin/addcategory') 
                        ? 'bg-pink-700 text-white' 
                        : 'text-pink-100 hover:bg-pink-700/50'}`}
                  >
                    Add Category
                  </Link>
                  <Link
                    to="/admin/categorylist"
                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
                      ${isActive('/admin/categorylist') 
                        ? 'bg-pink-700 text-white' 
                        : 'text-pink-100 hover:bg-pink-700/50'}`}
                  >
                    Category List
                  </Link>
                </div>
              </li>

              {/* Routine Dropdown */}
              <li>
                <button
                
                  onClick={() => toggleDropdown("routine")}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200
                    ${dropdowns.routine ? 'bg-pink-700 text-white' : 'text-pink-100 hover:bg-pink-700/50'}`}
                >
                  <AiTwotoneSchedule />
                  <span className="ms-3">Routines</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${dropdowns.routine ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  
                </button>
                <div className={`mt-2 space-y-1 ${dropdowns.routine ? 'block' : 'hidden'}`}>
                  <Link
                    to="/admin/addschedule"
                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
                      ${isActive('/admin/addschedule') 
                        ? 'bg-pink-700 text-white' 
                        : 'text-pink-100 hover:bg-pink-700/50'}`}
                  >
                    Add Routine
                  </Link>
                  <Link
                    to="/admin/schedulelist"
                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
                      ${isActive('/admin/schedulelist') 
                        ? 'bg-pink-700 text-white' 
                        : 'text-pink-100 hover:bg-pink-700/50'}`}
                  >
                    Routine List
                  </Link>
                </div>
              </li>

              {/* Students */}
              <li>
                <Link
                  to="/admin/students"
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 group
                    ${isActive('/admin/students') 
                      ? 'bg-pink-700 text-white' 
                      : 'text-pink-100 hover:bg-pink-700/50'}`}
                >
                  <svg
                    className="w-5 h-5 transition-colors duration-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z" />
                    <path d="M21 20c0-2-2-3-3.5-3s-3.5 1-3.5 3h-11c0-2-2-3-3.5-3s-3.5 1-3.5 3H3c0-3 2-4 5-4h6c3 0 5 1 5 4Z" />
                  </svg>
                  <span className="ms-3">Students</span>
                </Link>
              </li>
            </ul>
          </nav>
          {/* Sign Out Button */}
          <div className="p-4 border-t border-pink-700/50">
            <button
              onClick={() => signout(() => navigate("/login"))}
              className="flex items-center justify-center w-full p-3 rounded-lg text-pink-100 hover:bg-pink-700/50 transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="ms-3">Sign Out</span>
            </button>
          </div>
        
        </div>
      </aside>

      {/* Content */}
      <div className="sm:ml-64 p-4">
        <Outlet />
      </div>
    </>
  );
};

export default AdminHeader;
