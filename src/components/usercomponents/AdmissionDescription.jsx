import React from 'react';
import AdmissionImage from '../../assets/img/discuss.jpg';

const AdmissionDescription = () => {
  return (
    <div className="w-full mt-4 flex flex-col md:flex-row  p-6 md:p-12 bg-gray-50 mt-1">
      <div className="md:w-1/2 relative flex justify-center items-center">
        <img
          style={{ width: '100%', maxWidth: '500px', height: 'auto' }} // Responsive image size
          className="object-cover rounded-lg shadow-lg"
          src={AdmissionImage}
          alt="Admission"
        />
        <div
          className="absolute inset-0 flex justify-center items-center  bg-opacity-20 rounded-lg"
        >
          <div className="text-center text-white px-4 py-2">
            {/* Optional overlay content */}
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
        <div className="text-center text-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            We look forward to introducing you to SkishyaDwar.
          </h2>
          {/* <h3 className="text-xl md:text-2xl font-semibold mb-4">Admissions</h3> */}
          <p className="mb-6 text-sm md:text-base leading-relaxed">
            Education leads to understanding of important concepts and mastery of essential skills through instruction which is based on well-researched philosophies of teaching and learning strategies.
          </p>
          <a
            href="/apply"
            className="bg-pink-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition duration-300 transform hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdmissionDescription;
