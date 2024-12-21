import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartArrowDown, FaBars, FaTimes } from "react-icons/fa";
import LogoImage from '../../assets/img/logo.png';
import { isAuthenticated, signout } from '../../auth';

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling the mobile menu

  // Handle scroll event to toggle 'isScrolleddd'
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

  const handleRegisterClick = () => {
    navigate('/register');
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
        <div className={`hidden md:flex items-center `}> {/* Reduced gap here */}
          <div className="relative">
            <Link to="cart">
              <FaCartArrowDown size={24} className={isScrolled ? 'text-black' : 'text-white'} />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <button
              onClick={() => signout(() => navigate('/login'))}
              className={`text-sm px-5 py-2.5 gap-4 rounded-lg text-white font-semibold`}
            >
              Logout
            </button>
          )}

          {!isAuthenticated() && (
            <button
              onClick={handleLoginClick}
              className={`text-sm px-5 py-2.5 rounded-lg ${textColor} font-semibold`} // Button text color change here
            >
              Login
            </button>
          )}

          <button
            onClick={handleRegisterClick}
            className={`text-sm px-5 py-2.5 rounded-lg ${textColor} font-semibold`} // Button text color change here
          >
            Register
          </button>
        </div>
      </nav>

      {/* Secondary Navigation */}
      <div
        className={`bg-sky-100 dark:bg-gray-700 shadow-md md:block ${menuOpen ? 'block' : 'hidden'}`}
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
                Classes
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-900 dark:text-white hover:underline">
                Team
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-900 dark:text-white hover:underline">
                Features
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
