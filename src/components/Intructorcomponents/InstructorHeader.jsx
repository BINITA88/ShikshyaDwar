// import React, { useState } from "react";
// import { Link, Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
// import { TbCategoryFilled } from "react-icons/tb";
// import { FaFacebookMessenger } from "react-icons/fa6";
// import { isAuthenticated, signout } from "../../auth";
// const InstructorHeader = () => {
//   const [dropdowns, setDropdowns] = useState({
//     messages: false,
//     examSeat: false,
//     mockTest: false,
//     category: false,
//   });
//  ;
  
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();

//   if (!isAuthenticated() || isAuthenticated().user.role !== 2) {
//     return <Navigate to="/login" />;
//   }

//   const { user } = isAuthenticated();
//   const navigate = useNavigate();

//   const toggleDropdown = (key) => {
//     setDropdowns((prevState) => ({
//       ...prevState,
//       [key]: !prevState[key],
//     }));
//   };

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   // Function to get current page title based on path
//   const getCurrentPageTitle = () => {
//     switch (location.pathname) {
//       case '/instructor':
//         return 'Dashboard';
//       case '/instructor/addmessages':
//         return 'Add Messages';
//       case '/instructor/messageslist':
//         return 'Message List';
//       case '/instructor/addmocktest':
//           return 'Add Mock Test ';
//       case '/instructor/mocktestlist':
//         return 'Mock Test List';
//       case '/instructor/addseat':
//           return 'Add Exam Seat';
//       case '/instructor/seatlist':
//         return 'Mock Test Seat List';
//       case '/instructor/students':
//         return 'Students';
//       default:
//         return 'Dashboard';
//     }
//   };

//   return (
//     <>
//       {/* Sidebar Toggle Button */}
//       <button
//         onClick={() => setSidebarOpen(!isSidebarOpen)}
//         className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-pink-800 text-white sm:hidden hover:bg-pink-700 transition-colors duration-200"
//       >
//         <span className="sr-only">Toggle sidebar</span>
//         <svg
//           className="w-6 h-6"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           {isSidebarOpen ? (
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           ) : (
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//           )}
//         </svg>
//       </button>

//       {/* Top Header */}
//       <div className="fixed h-24 top-0 right-0 left-0 sm:left-64 z-30 bg-gradient-to-r from-pink-800 to-pink-900 shadow-md">
//         <div className="px-6 py-4">
//           <h1 className="text-xl font-semibold justify-center mt-5 text-white">{getCurrentPageTitle()}</h1>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } sm:translate-x-0`}
//       >
//         <div className="h-full flex flex-col bg-gradient-to-b from-pink-800 to-pink-900 shadow-2xl">
//           {/* Rest of the sidebar code remains the same */}
//           {/* Admin Profile Section */}
//           <div className="p-6 border-b border-pink-700/50">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 rounded-full bg-pink-700 flex items-center justify-center">
//                 <span className="text-xl text-white font-semibold">
//                   {user.name?.[0]?.toUpperCase() || 'A'}
//                 </span>
//               </div>
//               <div>
//                 <h2 className="text-white font-semibold">{user.name}</h2>
//                 <p className="text-pink-200 text-sm">Instructor</p>
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 px-3 py-4 overflow-y-auto">
//             <ul className="space-y-2 font-medium">
//               {/* Dashboard */}
//               <li>
//                 <Link
//                   to="/instructor"
//                   className={`flex items-center p-3 rounded-lg transition-all duration-200 group
//                     ${isActive('/instructor') 
//                       ? 'bg-pink-700 text-white' 
//                       : 'text-pink-100 hover:bg-pink-700/50'}`}
//                 >
//                   <svg
//                     className="w-5 h-5 transition-colors duration-200"
//                     fill="currentColor"
//                     viewBox="0 0 22 21"
//                   >
//                     <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
//                     <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
//                   </svg>
//                   <span className="ms-3">Dashboard</span>
//                 </Link>
//               </li>

//               {/* Course Dropdown */}
//               <li>
               
//                 <button
                
//                   onClick={() => toggleDropdown("messages")}
//                   className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200
//                     ${dropdowns.course ? 'bg-pink-700 text-white' : 'text-pink-100 hover:bg-pink-700/50'}`}
//                 >
              
//                   <div className="flex items-center">
//                   <FaFacebookMessenger />
                
//                     <span className="ms-3">Messages</span>
//                   </div>
//                   <svg
//                     className={`w-4 h-4 transition-transform duration-200 ${
//                       dropdowns.course ? 'rotate-180' : ''
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                   </svg>
                 
//                 </button>
//                 <div className={`mt-2 space-y-1 ${dropdowns.course ? 'block' : 'hidden'}`}>
                  
//                   <Link
//                     to="/instructor/addmessages"
//                     className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
//                       ${isActive('/instructor/addmessages') 
//                         ? 'bg-pink-700 text-white' 
//                         : 'text-pink-100 hover:bg-pink-700/50'}`}
//                   >
//                     Add Message
//                   </Link>
//                   <Link
//                     to="/instructor/messageslist"
//                     className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
//                       ${isActive('/intructor/messageslist') 
//                         ? 'bg-pink-700 text-white' 
//                         : 'text-pink-100 hover:bg-pink-700/50'}`}
//                   >
//                   Message List
//                   </Link>
//                 </div>
//               </li>
// {/* scsf */}
// {/* addseat */}
// <li>
               
//                <button
               
//                  onClick={() => toggleDropdown("examSeat")}
//                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200
//                    ${dropdowns.course ? 'bg-pink-700 text-white' : 'text-pink-100 hover:bg-pink-700/50'}`}
//                >
             
//                  <div className="flex items-center">
//                  <FaFacebookMessenger />
               
//                    <span className="ms-3">Exam Seat</span>
//                  </div>
//                  <svg
//                    className={`w-4 h-4 transition-transform duration-200 ${
//                      dropdowns.course ? 'rotate-180' : ''
//                    }`}
//                    fill="none"
//                    stroke="currentColor"
//                    viewBox="0 0 24 24"
//                  >
//                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                  </svg>
                
//                </button>
//                <div className={`mt-2 space-y-1 ${dropdowns.course ? 'block' : 'hidden'}`}>
                 
//                  <Link
//                    to="/instructor/addseat"
//                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
//                      ${isActive('/instructor/addseat') 
//                        ? 'bg-pink-700 text-white' 
//                        : 'text-pink-100 hover:bg-pink-700/50'}`}
//                  >
//                    Add Mock Test Seat
//                  </Link>
//                  <Link
//                    to="/instructor/seatlist"
//                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
//                      ${isActive('/intructor/seatlist') 
//                        ? 'bg-pink-700 text-white' 
//                        : 'text-pink-100 hover:bg-pink-700/50'}`}
//                  >
//              Exam Seat List
//                  </Link>
//                </div>
//              </li>
//               <li>
               
//                <button
               
//                  onClick={() => toggleDropdown("mockTest")}
//                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200
//                    ${dropdowns.course ? 'bg-pink-700 text-white' : 'text-pink-100 hover:bg-pink-700/50'}`}
//                >
             
//                  <div className="flex items-center">
//                  <FaFacebookMessenger />
               
//                    <span className="ms-3">Mock Test</span>
//                  </div>
//                  <svg
//                    className={`w-4 h-4 transition-transform duration-200 ${
//                      dropdowns.course ? 'rotate-180' : ''
//                    }`}
//                    fill="none"
//                    stroke="currentColor"
//                    viewBox="0 0 24 24"
//                  >
//                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                  </svg>
                
//                </button>
//                <div className={`mt-2 space-y-1 ${dropdowns.course ? 'block' : 'hidden'}`}>
                 
//                  <Link
//                    to="/instructor/addmocktest"
//                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
//                      ${isActive('/instructor/addmocktest') 
//                        ? 'bg-pink-700 text-white' 
//                        : 'text-pink-100 hover:bg-pink-700/50'}`}
//                  >
//                    Add Mock Test Seat
//                  </Link>
//                  <Link
//                    to="/instructor/mocktestlist"
//                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
//                      ${isActive('/intructor/mocktestlist') 
//                        ? 'bg-pink-700 text-white' 
//                        : 'text-pink-100 hover:bg-pink-700/50'}`}
//                  >
//                  Mock Test List
//                  </Link>
//                </div>
//              </li>




// {/* Dashboard */}


//               {/* Students */}
//               <li>
//                 <Link
//                   to="/instructor/student"
//                   className={`flex items-center p-3 rounded-lg transition-all duration-200 group
//                     ${isActive('/instructor/student') 
//                       ? 'bg-pink-700 text-white' 
//                       : 'text-pink-100 hover:bg-pink-700/50'}`}
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
//                   </svg>
//                   <span className="ms-3">Students</span>
//                 </Link>
//               </li>
//             </ul>
//           </nav>

//           {/* Sign Out Button */}
//           <div className="p-4 border-t border-pink-700/50">
//             <button
//               onClick={() => signout(() => navigate("/login"))}
//               className="flex items-center justify-center w-full p-3 rounded-lg text-pink-100 hover:bg-pink-700/50 transition-all duration-200"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               <span className="ms-3">Sign Out</span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="p-4 sm:ml-64 mt-16">
//         <div className="p-6 bg-white rounded-xl shadow-sm">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default InstructorHeader;


















import React, { useState } from "react";
import { Link, Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { TbCategoryFilled } from "react-icons/tb";
import { FaFacebookMessenger } from "react-icons/fa6";
import { isAuthenticated, signout } from "../../auth";

const InstructorHeader = () => {
  const [dropdowns, setDropdowns] = useState({
    messages: false,
    examSeat: false,
    category: false,
  });

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!isAuthenticated() || isAuthenticated().user.role !== 2) {
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
      case '/instructor':
        return 'Dashboard';
      case '/instructor/addmessages':
        return 'Add Messages';
      case '/instructor/messageslist':
        return 'Message List';
      case '/instructor/addseat':
        return 'Add Exam Seat';
      case '/instructor/seatlist':
        return 'Mock Test Seat List';
      case '/instructor/students':
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
                <p className="text-pink-200 text-sm">Instructor</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              {/* Dashboard */}
              <li>
                <Link
                  to="/instructor"
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 group
                    ${isActive('/instructor') 
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

              {/* Messages Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("messages")}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200
                    ${dropdowns.messages ? 'bg-pink-700 text-white' : 'text-pink-100 hover:bg-pink-700/50'}`}
                >
                  <div className="flex items-center">
                    <FaFacebookMessenger />
                    <span className="ms-3">Messages</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdowns.messages ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`mt-2 space-y-1 ${dropdowns.messages ? 'block' : 'hidden'}`}>
                  <Link
                    to="/instructor/addmessages"
                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
                      ${isActive('/instructor/addmessages') 
                        ? 'bg-pink-700 text-white' 
                        : 'text-pink-100 hover:bg-pink-700/50'}`}
                  >
                    Add Message
                  </Link>
                  <Link
                    to="/instructor/messageslist"
                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
                      ${isActive('/instructor/messageslist') 
                        ? 'bg-pink-700 text-white' 
                        : 'text-pink-100 hover:bg-pink-700/50'}`}
                  >
                    Message List
                  </Link>
                </div>
              </li>

              {/* Exam Seat Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("examSeat")}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200
                    ${dropdowns.examSeat ? 'bg-pink-700 text-white' : 'text-pink-100 hover:bg-pink-700/50'}`}
                >
                  <div className="flex items-center">
                    <TbCategoryFilled />
                    <span className="ms-3">Exam Seat</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdowns.examSeat ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`mt-2 space-y-1 ${dropdowns.examSeat ? 'block' : 'hidden'}`}>
                  <Link
                    to="/instructor/addseat"
                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
                      ${isActive('/instructor/addseat') 
                        ? 'bg-pink-700 text-white' 
                        : 'text-pink-100 hover:bg-pink-700/50'}`}
                  >
                    Add Exam Seat
                  </Link>
                  <Link
                    to="/instructor/seatlist"
                    className={`flex items-center pl-11 p-3 rounded-lg transition-all duration-200
                      ${isActive('/instructor/seatlist') 
                        ? 'bg-pink-700 text-white' 
                        : 'text-pink-100 hover:bg-pink-700/50'}`}
                  >
                    Exam Seat List
                  </Link>
                </div>
              </li>

              
              {/* Students */}
              <li>
                <Link
                  to="/instructor/students"
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 group
                    ${isActive('/instructor/students') 
                      ? 'bg-pink-700 text-white' 
                      : 'text-pink-100 hover:bg-pink-700/50'}`}
                >
                  <svg
                    className="w-5 h-5 transition-colors duration-200"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M11 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM9 19v-1a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v1H5v-1a1 1 0 0 1 1-1h3Zm5-2a2 2 0 1 0-4 0h4Z" />
                  </svg>
                  <span className="ms-3">Students</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Sign out */}
          <div className="p-4 border-t border-pink-700/50">
            <button
              onClick={() => signout(() => navigate("/login"))}
              className="text-pink-100 hover:bg-pink-700/50 w-full p-3 rounded-lg"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pt-24 sm:pl-64">
        <Outlet />
      </main>
    </>
  );
};

export default InstructorHeader;
