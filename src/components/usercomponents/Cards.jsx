import React from 'react';
import { Link } from 'react-router-dom';

const Cards = (props) => {
  const { _id, product_name, product_image, category, product_price, product_description, instructor, schedule, duration } = props.data;

  
  
  
  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="h-56 w-full">
          <a href="#">
            <img className="mx-auto h-full dark:hidden" src={`http://localhost:9000/${product_image}`} alt={product_name} />
            <img className="mx-auto hidden h-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" />
          </a>
        </div>
        <div className="pt-6">
          <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{product_name}</a>

          <div className="mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Category: {category.category_name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Instructor: {instructor || 'N/A'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Duration: {duration || 'N/A'}</p>
           
          </div>

          <p className="text-lg font-extrabold leading-tight text-gray-900 dark:text-white mb-5">Rs. {product_price}</p>
          
          <Link to={`/productdetail/${_id}`}>
            <button
              type="button"
              className="inline-flex items-center rounded-lg bg-yellow-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg className="h-5 w-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              View Detail
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cards;
