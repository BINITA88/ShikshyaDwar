import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Github, 
  Linkedin,
  GraduationCap,
  Plane,
  BookOpen,
  Users,
  Building2
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-800 to-pink-900 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-pink-200" />
              <h1 className="text-2xl font-bold text-white">Shikshyadwar</h1>
            </div>
            <p className="text-gray-200 text-sm mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Abroad Study Consultancy
            </p>
            <p className="text-gray-200 text-sm max-w-xs">
              Your trusted partner for overseas education guidance and consultancy services.
              Transforming dreams into academic success stories since 2010.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-pink-200" />
                Services
              </h2>
              <ul className="text-gray-200 font-medium">
                <li className="mb-4">
                  <Link to="/counseling" className="hover:text-pink-200 transition-colors duration-200 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Career Counseling
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/universities" className="hover:text-pink-200 transition-colors duration-200 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    University Selection
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/visa" className="hover:text-pink-200 transition-colors duration-200 flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    Visa Assistance
                  </Link>
                </li>
                <li>
                  <Link to="/test-prep" className="hover:text-pink-200 transition-colors duration-200 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Test Preparation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase flex items-center gap-2">
                <Plane className="w-4 h-4 text-pink-200" />
                Study Destinations
              </h2>
              <ul className="text-gray-200 font-medium">
                <li className="mb-4 group">
                  <Link to="/usa" className="hover:text-pink-200 transition-colors duration-200 flex items-center gap-2">
                    <span className="w-6">🇺🇸</span>
                    USA
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/uk" className="hover:text-pink-200 transition-colors duration-200 flex items-center gap-2">
                    <span className="w-6">🇬🇧</span>
                    UK
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/australia" className="hover:text-pink-200 transition-colors duration-200 flex items-center gap-2">
                    <span className="w-6">🇦🇺</span>
                    Australia
                  </Link>
                </li>
                <li>
                  <Link to="/canada" className="hover:text-pink-200 transition-colors duration-200 flex items-center gap-2">
                    <span className="w-6">🇨🇦</span>
                    Canada
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-200" />
                Contact
              </h2>
              <ul className="text-gray-200 font-medium">
                <li className="mb-4">
                  <Link to="/contact" className="hover:text-pink-200 transition-colors duration-200 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Get in Touch
                  </Link>
                </li>
                <li className="mb-4">
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    +977-1-234567
                  </span>
                </li>
                <li className="mb-4">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    info@shikshyadwar.com
                  </span>
                </li>
                <li>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Kathmandu, Nepal
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300/20 sm:mx-auto lg:my-8" />
        
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-200 sm:text-center">
            © 2024 <Link to="/" className="hover:text-pink-200 transition-colors duration-200">Shikshyadwar™</Link>. 
            All Rights Reserved.
          </span>
          
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <Link to="#" className="text-gray-200 hover:text-pink-200 transition-colors duration-200">
              <Facebook className="w-5 h-5" />
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link to="#" className="text-gray-200 hover:text-pink-200 transition-colors duration-200">
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter page</span>
            </Link>
            
            <Link to="#" className="text-gray-200 hover:text-pink-200 transition-colors duration-200">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub account</span>
            </Link>
            <Link to="#" className="text-gray-200 hover:text-pink-200 transition-colors duration-200">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn page</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;