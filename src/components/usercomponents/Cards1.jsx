import React from 'react'
import cover4 from '../../assets/img/ielts.png';
import cover5 from '../../assets/img/pte.png';
import cover6 from '../../assets/img/sat.png';
import cover7 from '../../assets/img/TOEFL.png';


const Cards1 = () => {
  return (
   <>
   <section className="py-14">
      <div className="mx-auto max-w-7xl px-8 sm:px-6 lg:px-8 gap-16">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 text-center">
       Preparation Class
        </h2>
        <p className="text-start text-lg mb-8 font-semibold">
          Embark on a journey of knowledge and growth with our diverse range of Study Destinations. Whether you're seeking to enhance your skills, broaden your horizons, or dive into a new field altogether, SkishyaDwar offers something for everyone.
        </p>

        {/* <h3 className="text-3xl font-bold  mb-5"> Preparation Class</h3> */}
        <div className="flex  gap-3 mb-8">
          {/* <button type="button" className="text-white bg-[#99154B] hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5">
            All
          </button>
          <button type="button" className="text-white bg-[#99154B] hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5">
            In-Demand Country
          </button> */}
         
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Python with Data Science Card */}
          <a
            href="#"
            className="group cursor-pointer bg-white transition-all duration-500 shadow-lg hover:shadow-2xl rounded-lg border border-gray-200 p-6 h-full">
            <div className="overflow-hidden">
              <img
                src={cover4}
                alt="Python with Data Science"
                className="w-full aspect-square rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 text-center">
              <h6 className="font-semibold text-lg leading-7 text-black transition-all duration-500 group-hover:text-indigo-600">
                IELTS
              </h6>
              <p className="mt-1 font-normal text-sm leading-6 text-gray-500">SikshyaDwar</p>
            </div>
          </a>

          {/* MERN Stack Development Card */}
          <a
            href="#"
            className="group cursor-pointer bg-white transition-all duration-500 shadow-lg hover:shadow-2xl rounded-lg border border-gray-200 p-6 h-full">
            <div className="overflow-hidden">
              <img
                src={cover5}
                alt="MERN Stack Development"
                className="w-full aspect-square rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 text-center">
              <h6 className="font-semibold text-lg leading-7 text-black transition-all duration-500 group-hover:text-indigo-600">
               PTE
              </h6>
              <p className="mt-1 font-normal text-sm leading-6 text-gray-500">SikshyaDwar</p>
            </div>
          </a>

          {/* Full Stack Development with Django Card */}
          <a
            href="#"
            className="group cursor-pointer bg-white transition-all duration-500 shadow-lg hover:shadow-2xl rounded-lg border border-gray-200 p-6 h-full">
            <div className="overflow-hidden">
              <img
                src={cover6}
                alt="Full Stack Development with Django"
                className="w-full aspect-square rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 text-center">
              <h6 className="font-semibold text-lg leading-7 text-black transition-all duration-500 group-hover:text-indigo-600">
              SAT
              </h6>
              <p className="mt-1 font-normal text-sm leading-6 text-gray-500">SikshyaDwar</p>
            </div>
          </a>

          {/* UX/UI Design Card */}
          <a
            href="#"
            className="group cursor-pointer bg-white transition-all duration-500 shadow-lg hover:shadow-2xl rounded-lg border border-gray-200 p-6 h-full">
            <div className="overflow-hidden">
              <img
                src={cover7}
                alt="User Experience Design"
                className="w-full aspect-square rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 text-center">
              <h6 className="font-semibold text-lg leading-7 text-black transition-all duration-500 group-hover:text-indigo-600">
              TOEFL
              </h6>
              <p className="mt-1 font-normal text-sm leading-6 text-gray-500">SikshyaDwar</p>
            </div>
          </a>
        </div>
      </div>
    </section>
   </>
  )
}

export default Cards1