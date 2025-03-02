import React, { useState } from "react";
import { Link, Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { TbCategoryFilled } from "react-icons/tb";
import { isAuthenticated, signout } from "../../auth";
import { FaBookReader, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";
import { AiTwotoneSchedule } from "react-icons/ai";
import { FiMenu, FiX } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";

const AdminHeader = () => {
  const [dropdowns, setDropdowns] = useState({
    course: false,
    category: false,
    routine: false, // Routine dropdown added & functional
  });

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated() || isAuthenticated().user.role !== 1) {
    return <Navigate to="/login" />;
  }

  const { user } = isAuthenticated();

  const toggleDropdown = (key) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const isActive = (path) => location.pathname === path;

  const getCurrentPageTitle = () => {
    switch (location.pathname) {
      case "/admin":
        return "Dashboard";
      case "/admin/addproduct":
        return "Add Course";
      case "/admin/productlist":
        return "Course List";
      case "/admin/addcategory":
        return "Add Category";
      case "/admin/categorylist":
        return "Category List";
      case "/admin/addschedule":
        return "Add Routine";
      case "/admin/schedulelist":
        return "Routine List";
      case "/admin/students":
        return "Students";
      default:
        return "Dashboard";
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
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Top Header */}
      <div className="fixed h-24 top-0 right-0 left-0 sm:left-64 z-30 bg-gradient-to-r from-pink-800 to-pink-900 shadow-md flex items-center px-6">
        <h1 className="text-xl font-semibold text-white">{getCurrentPageTitle()}</h1>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="h-full flex flex-col bg-gradient-to-b from-pink-800 to-pink-900 shadow-2xl">
          {/* Admin Profile Section */}
          <div className="p-6 border-b border-pink-700/50 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-pink-700 flex items-center justify-center">
              <span className="text-xl text-white font-semibold">
                {user.name?.[0]?.toUpperCase() || "A"}
              </span>
            </div>
            <div>
              <h2 className="text-white font-semibold">{user.name}</h2>
              <p className="text-pink-200 text-sm">Admin</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              {/* Dashboard */}
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                    isActive("/admin") ? "bg-pink-700 text-white" : "text-pink-100 hover:bg-pink-700/50"
                  }`}
                >
<AiFillHome className="w-5 h-5" />
<span className="ms-3">Dashboard</span>
                </Link>
              </li>

              {/* Course Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("course")}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 ${
                    dropdowns.course ? "bg-pink-700 text-white" : "text-pink-100 hover:bg-pink-700/50"
                  }`}
                >
                  <div className="flex items-center">
                    <FaBookReader size={22}/>
                    <span className="ms-3">Courses</span>
                  </div>
                </button>
                <div className={`mt-2 space-y-1 ${dropdowns.course ? "block" : "hidden"}`}>
                  <Link to="/admin/addproduct" className={`block pl-11 p-3 ${isActive("/admin/addproduct") ? "bg-pink-700 text-white" : "text-pink-100 hover:bg-pink-700/50"}`}>Add Course</Link>
                  <Link to="/admin/productlist" className={`block pl-11 p-3 ${isActive("/admin/productlist") ? "bg-pink-700 text-white" : "text-pink-100 hover:bg-pink-700/50"}`}>Course List</Link>
                </div>
              </li>

              {/* Category Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("category")}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 ${
                    dropdowns.category ? "bg-pink-700 text-white" : "text-pink-100 hover:bg-pink-700/50"
                  }`}
                >
                  <div className="flex items-center">
                    <TbCategoryFilled size={22} />
                    <span className="ms-3">Categories</span>
                  </div>
                </button>
                <div className={`mt-2 space-y-1 ${dropdowns.category ? "block" : "hidden"}`}>
                  <Link to="/admin/addcategory" className={`block pl-11 p-3 ${isActive("/admin/addcategory") ? "bg-pink-700 text-white" : "text-pink-100 hover:bg-pink-700/50"}`}>Add Category</Link>
                  <Link to="/admin/categorylist" className={`block pl-11 p-3 ${isActive("/admin/categorylist") ? "bg-pink-700 text-white" : "text-pink-100 hover:bg-pink-700/50"}`}>Category List</Link>
                </div>
              </li>

              {/* Routine Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("routine")}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 ${
                    dropdowns.routine ? "bg-pink-700 text-white" : "text-pink-100 hover:bg-pink-700/50"
                  }`}
                >
                  <div className="flex items-center">
                    <AiTwotoneSchedule size={22} />
                    <span className="ms-3">Routines</span>
                  </div>
                </button>
                <div className={`mt-2 space-y-1 ${dropdowns.routine ? "block" : "hidden"}`}>
                  <Link to="/admin/addschedule" className="block pl-11 p-3 text-pink-100 hover:bg-pink-700/50">Add Routine</Link>

                </div>
              </li>

              {/* Students */}
              <li>
                <Link to="/admin/students" className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${isActive("/admin/students") ? "bg-pink-700 text-white" : "text-pink-100 hover:bg-pink-700/50"}`}>
                  <FaUserGraduate className="w-5 h-5" />
                  <span className="ms-3">Students</span>
                </Link>
              </li>
            </ul>
          </nav>
{/* Sign Out Button */}
<div className="p-4 border-t border-pink-700/50">
  <button
    onClick={() => {
      if (window.confirm("Are you sure you want to log out?")) {
        signout(() => navigate("/login"));
      }
    }}
    className="flex items-center justify-start w-full p-3 rounded-lg text-pink-100 hover:bg-pink-700/50 transition-all duration-200"
  >
    <FaSignOutAlt className="w-5 h-5" />
    <span className="ms-3">Sign Out</span>
  </button>
</div>

        </div>
      </aside>

      {/* Content - Fixing Upward Shift */}
      <div className="sm:ml-64 mt-24 p-4 min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default AdminHeader;
