import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartArrowDown, FaBars, FaTimes, FaBell } from "react-icons/fa";
import LogoImage from '../../assets/img/logo.png';
import { isAuthenticated, signout } from '../../auth';
import { FaFacebookMessenger } from "react-icons/fa6";
import profile from '../../assets/img/profile.png';

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling the mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for toggling the profile dropdown

  // Handle scroll event to toggle 'isScrolled'
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleMessageClick = () => {
    navigate('/conversation');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const headerStyle = {
    position: 'sticky',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 10,
    backgroundColor: isScrolled ? 'white' : '#99154B',
    borderBottom: isScrolled ? '1px solid #e0e0e0' : 'none',
    boxShadow: isScrolled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'background-color 0.3s, border-bottom 0.3s, box-shadow 0.3s',
  };

  const textColor = isScrolled ? 'text-black' : 'text-white';

  return (
    <>
      {/* Primary Header */}
      <nav style={headerStyle} className="flex justify-between items-center p-4 md:p-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={LogoImage} alt="SikshyaDwar Logo" className="w-17 h-12" />
          <Link to="/" className={`text-2xl font-semibold ${textColor}`}>
            ShikshyaDwar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FaTimes className={textColor} /> : <FaBars className={textColor} />}
        </button>

        {/* Right Section */}
        <div className={`hidden md:flex items-center space-x-4`}> {/* Added space-x-4 here */}
          {/* Messenger Button */}
          <button
            onClick={handleMessageClick}
            className={`text-sm px-5 py-2.5 rounded-lg ${textColor} font-semibold`}
          >
            <FaFacebookMessenger size={20} />
          </button>

       {/* Notification Button */}
       <div className="relative">
      <Link to="/notice">
        <FaBell size={26} className="text-yellow-300" />
        <span
          className={`absolute bottom-4 right-0 text-sm font-bold rounded-full ${
            isScrolled ? 'text-black' : 'text-white'
          }`}
        >
          15
        </span>
      </Link>
    </div>


          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center">
              <img src={profile} alt="Profile" className="w-10 h-10 rounded-full" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                {!isAuthenticated() && (
                  <button
                    onClick={handleLoginClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </button>
                )}

                <Link
                  to="/register"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleRegisterClick}
                >
                  Register
                </Link>

                <Link
                  to="/apply"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mock Test
                </Link>

                <Link
                  to="/routine"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Routine
                </Link>

                <Link
                  to="/notice"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Notice
                </Link>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                  <button
                    onClick={() => signout(() => navigate('/login'))}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Secondary Navigation */}
      <div
        className={`bg-slate-800 dark:bg-gray-700 shadow-md md:block ${menuOpen ? 'block' : 'hidden'}`}
      >
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <ul className="flex flex-col md:flex-row font-medium md:space-x-8 text-sm">
            <li>
              <Link to="/" className="text-gray-900 dark:text-white hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/product" className="text-gray-900 dark:text-white hover:underline">
                Courses
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
