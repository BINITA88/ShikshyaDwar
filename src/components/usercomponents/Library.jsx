import React from 'react'
import L1Image from '../../assets/img/library.png';
import  L2Image from '../../assets/img/student.png';

const Library = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:justify-between  mb-6 px-6 lg:px-20">
        <div className="flex flex-col items-center mb-10 lg:mb-0">
          <div className="w-full lg:w-1/2 h-auto">
            <img className="mx-auto" style={{ width: 500, height: 240 }} src={L1Image} alt="Student" />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-xl font-semibold">Student</h1>
            <p className="text-gray-700">Students can check their assignment by logging into the assignment management system here. Parents and guardians can also enter the system.</p>
          </div>
        </div>
        <div className="flex flex-col items-center ml-12" >
          <div className="w-full lg:w-1/2 h-auto">
            <img className="mx-auto" style={{ width: 500, height: 240 }} src={L2Image} alt="Library" />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-xl font-semibold">Preperation Classes</h1>
            <p className="text-gray-700">Libraries at the Ullens School hold over 20,000 books, periodicals, and resource materials. Students have access to an online library management system.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Library
