import React from 'react';
import philosophyImage from '../../assets/img/philosophy.png';

const Carousel1 = () => {
  return (
    <>
      <div style={{ position: 'relative' }}>
        {/* Sticky Background Image */}
        <div
          style={{
            backgroundImage: `url(${philosophyImage})`,
            height: '80vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'sticky',
            top: 0,
            zIndex: -1
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: '3rem',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              paddingLeft: '50px',
              paddingTop: '20px',
              position: 'absolute',
              bottom: '20px',
              marginBottom: "30px",
            }}
          >
            ShikshyaDwar
          </h1>
        </div>

        {/* Content Section */}
        <div
          style={{
            padding: '60px 40px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            marginTop: '-40px', // Pull up the section to overlap the background
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Content Layout */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', zIndex: 1 }}>
            {/* Left Content */}
            <div style={{ width: '55%', marginLeft: '50px' }}>
              <h2 style={{ color: '#d9145c', fontSize: '2rem', lineHeight: '1.5', marginBottom: '25px' }}>
                ShikshyaDwar has been leading by example in progressive education for the last 15 years to bring in world-class education opportunities to Nepal.
              </h2>
              <div>
                <h3 style={{ marginBottom: '20px' }}>Our institutional philosophies are:</h3>
                <ul style={{ listStyleType: 'none', padding: 0, marginLeft: '10px' }}>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px', color: 'green', fontSize: '1.5rem' }}>✔</span>
                    <span><strong>Promote diversity:</strong> Ensuring diversity in the campus body in economic, cognitive, ethnic, and gender aspects.</span>
                  </li>
                  <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px', color: 'green', fontSize: '1.5rem' }}>✔</span>
                    <span><strong>Foster Social Responsibility:</strong> Providing financial subsidies for 20% of students from low-income families and supporting public schools.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px', color: 'green', fontSize: '1.5rem' }}>✔</span>
                    <span><strong>Financial Sustainability:</strong> Ensuring sustainability to maintain a vibrant learning atmosphere and support growth in perpetuity.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Form Section */}
            <div style={{ width: '40%', marginRight: '50px', padding: '20px', }}>
                <div style={{ width: '100%',  padding: '20px'}}>
              <h2 className="text-center text-3xl font-bold text-pink-900 mb-8">
                Admission Consultation Form
              </h2>
              <form className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-semibold">Full Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold">Email Address</label>
                  <input
                    type="email"
                    required
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-gray-700 font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-gray-700 font-semibold">Country</label>
                  <select
                    required
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                  >
                    <option value="">Select your destination country</option>
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="uk">UK</option>
                    <option value="usa">USA</option>
                  </select>
                </div>

                {/* Consultation Date */}
                <div>
                  <label className="block text-gray-700 font-semibold">Consultation Date</label>
                  <input
                    type="date"
                    required
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                  />
                </div>

                {/* Education Level */}
                <div>
                  <label className="block text-gray-700 font-semibold">Education Level</label>
                  <select
                    required
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                  >
                    <option value="">Select your education level</option>
                    <option value="high-school">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 font-semibold">Message</label>
                  <textarea
                    rows="4"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                    placeholder="Briefly describe your consultation requirements"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-pink-600 text-white p-3 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel1;
