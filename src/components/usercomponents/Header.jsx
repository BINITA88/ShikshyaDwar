// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes, FaBook, FaUser, FaSignOutAlt, FaClipboardList, FaBell, FaRegCalendarAlt } from "react-icons/fa";
// import { IoPersonSharp } from "react-icons/io5";
// import { MdNotificationsActive, MdOutlineMenuBook } from "react-icons/md";
// import { FaFacebookMessenger } from "react-icons/fa6";
// import LogoImage from '../../assets/img/logo.png';
// import { isAuthenticated, signout } from '../../auth';

// const Header = () => {
//   const navigate = useNavigate();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Handle scroll event for sticky header
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const handleLoginClick = () => navigate('/login');
//   const handleMessageClick = () => navigate('/conversation');
//   const handleRegisterClick = () => navigate('/register');
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   return (
//     <>
//       {/* Header */}
//       <nav 
//         className={`fixed top-0 left-0 w-full z-50 h-24 flex justify-between items-center px-8 transition-all border-b border-gray-300 ${
//           isScrolled ? "bg-pink-800 shadow-lg" : "bg-white shadow-md"
//         }`}
//       >
//         {/* Logo Section */}
//         <div className="flex items-center ">
//           <img src={LogoImage} alt="ShikshyaDwar Logo" className="w-20 h-15" />
//           <Link to="/" className={`text-2xl font-semibold ${isScrolled ? "text-white" : "text-black"}`}>
//             ShikshyaDwar
//           </Link>
//         </div>

//         {/* Right Section */}
//         <div className="hidden md:flex items-center space-x-6">
//           {/* Navigation Icons */}
//           <Link to="/product" className={`flex items-center transition ${isScrolled ? "text-white" : "text-gray-700"} hover:text-gray-300`}>
//             <MdOutlineMenuBook size={26} />
//           </Link>
//           <button onClick={handleMessageClick} className={`transition ${isScrolled ? "text-white" : "text-gray-700"} hover:text-gray-300`}>
//             <FaFacebookMessenger size={24} />
//           </button>
//           <div className="relative">
//   <Link to="/notice">
//     <MdNotificationsActive 
//       size={24} 
//       className={`transition ${isScrolled ? "text-white" : "text-gray-700"} hover:text-gray-300`} 
//     />
//     {/* Notification Count Badge */}
//     <span className="absolute -top-1 -right-2 text-xs font-bold text-white bg-pink-600 rounded-full px-1">
//       15
//     </span>
//   </Link>
// </div>
          
//               {/* Profile Dropdown */}
// <div className="relative">
//   <button onClick={toggleDropdown}>
//     <IoPersonSharp size={24} className={`transition ${isScrolled ? "text-white" : "text-gray-700"} hover:text-gray-300`} />
//   </button>

//   {dropdownOpen && (
//     <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2">
//       {!isAuthenticated() && (
//         <button
//           onClick={() => {
//             handleLoginClick();
//             setDropdownOpen(false);
//           }}
//           className="flex items-center w-full text-left px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100"
//         >
//           <FaUser className="mr-2 text-gray-700" size={22} /> Login
//         </button>
//       )}
//       <Link
//         to="/register"
//         className="flex items-center px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100"
//         onClick={() => {
//           handleRegisterClick();
//           setDropdownOpen(false);
//         }}
//       >
//         <FaUser className="mr-2 text-gray-700" size={22} /> Register
//       </Link>
//       <Link
//         to="/apply"
//         className="flex items-center px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100"
//         onClick={() => setDropdownOpen(false)}
//       >
//         <FaClipboardList className="mr-2 text-gray-700" size={22} /> Mock Test
//       </Link>
//       <Link
//         to="/routine"
//         className="flex items-center px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100"
//         onClick={() => setDropdownOpen(false)}
//       >
//         <FaRegCalendarAlt className="mr-2 text-gray-700" size={22} /> Routine
//       </Link>
//       <Link
//         to="/notice"
//         className="flex items-center px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100"
//         onClick={() => setDropdownOpen(false)}
//       >
//         <FaBell className="mr-2 text-gray-700" size={22} /> Notice
//       </Link>
//       {isAuthenticated() && (
//         <button
//           onClick={() => {
//             signout(() => navigate('/login'));
//             setDropdownOpen(false);
//           }}
//           className="flex items-center w-full text-left px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100"
//         >
//           <FaSignOutAlt className="mr-2 text-gray-700" size={22} /> Logout
//         </button>
//       )}
//     </div>
//   )}


     
//           </div>
//         </div>
//       </nav>

//       {/* Spacer to push content below the fixed header */}
//       <div className="h-24"></div>
//     </>
//   );
// };

// export default Header;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaBook, FaUser, FaSignOutAlt, FaClipboardList, FaBell, FaRegCalendarAlt } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdNotificationsActive, MdOutlineMenuBook } from "react-icons/md";
import { FaFacebookMessenger } from "react-icons/fa6";
import LogoImage from '../../assets/img/logo.png';
import { isAuthenticated, signout } from '../../auth';

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle scroll event for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    setDropdownOpen(false);
    navigate('/login');
  };
  const handleMessageClick = () => {
    setMenuOpen(false);
    navigate('/conversation');
  };
  const handleRegisterClick = () => {
    setDropdownOpen(false);
    navigate('/register');
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Header */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 h-20 flex justify-between items-center px-6 md:px-8 transition-all border-b border-gray-300 ${
          isScrolled ? "bg-pink-800 shadow-lg" : "bg-white shadow-md"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={LogoImage} alt="ShikshyaDwar Logo" className="w-16 h-auto" />
          <Link to="/" className={`text-xl md:text-2xl font-semibold ml-2 ${isScrolled ? "text-white" : "text-black"}`}>
            ShikshyaDwar
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/product" className={`transition ${isScrolled ? "text-white" : "text-gray-700"} hover:text-gray-300`}>
            <MdOutlineMenuBook size={26} />
          </Link>
          <button onClick={handleMessageClick} className={`transition ${isScrolled ? "text-white" : "text-gray-700"} hover:text-gray-300`}>
            <FaFacebookMessenger size={24} />
          </button>
          <div className="relative">
            <Link to="/notice">
              <MdNotificationsActive size={24} className={`transition ${isScrolled ? "text-white" : "text-gray-700"} hover:text-gray-300`} />
              <span className="absolute -top-1 -right-2 text-xs font-bold text-white bg-pink-600 rounded-full px-1">
                15
              </span>
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown}>
              <IoPersonSharp size={24} className={`transition ${isScrolled ? "text-white" : "text-gray-700"} hover:text-gray-300`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2">
                {!isAuthenticated() && (
                  <button
                    onClick={handleLoginClick}
                    className="flex items-center w-full text-left px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100"
                  >
                    <FaUser className="mr-2 text-gray-700" size={22} /> Login
                  </button>
                )}
                <Link to="/register" className="flex items-center px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100" onClick={handleRegisterClick}>
                  <FaUser className="mr-2 text-gray-700" size={22} /> Register
                </Link>
                <Link to="/apply" className="flex items-center px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                  <FaClipboardList className="mr-2 text-gray-700" size={22} /> Mock Test
                </Link>
                <Link to="/routine" className="flex items-center px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                  <FaRegCalendarAlt className="mr-2 text-gray-700" size={22} /> Routine
                </Link>
                <Link to="/notice" className="flex items-center px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                  <FaBell className="mr-2 text-gray-700" size={22} /> Notice
                </Link>
                {isAuthenticated() && (
                  <button
                    onClick={() => {
                      signout(() => navigate('/login'));
                      setDropdownOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm transition text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2 text-gray-700" size={22} /> Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={28} className="text-gray-700" /> : <FaBars size={28} className="text-gray-700" />}
        </button>
      </nav>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transition-transform transform translate-x-0 p-6">
          <button onClick={toggleMenu} className="absolute top-4 right-4">
            <FaTimes size={24} className="text-gray-700" />
          </button>
          <div className="flex flex-col space-y-4 mt-10">
            <Link to="/" className="text-gray-800 text-lg font-semibold" onClick={toggleMenu}>Home</Link>
            <Link to="/product" className="text-gray-800 text-lg" onClick={toggleMenu}>Products</Link>
            <Link to="/conversation" className="text-gray-800 text-lg" onClick={toggleMenu}>Messages</Link>
            <Link to="/notice" className="text-gray-800 text-lg" onClick={toggleMenu}>Notifications</Link>
            {!isAuthenticated() && (
              <button className="text-gray-800 text-lg" onClick={handleLoginClick}>Login</button>
            )}
            {isAuthenticated() && (
              <button className="text-gray-800 text-lg" onClick={() => {
                signout(() => navigate('/login'));
                setMenuOpen(false);
              }}>Logout</button>
            )}
          </div>
        </div>
      )}

      {/* Spacer for Fixed Header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;
