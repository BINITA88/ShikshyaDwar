import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, User, Tag, Trophy } from 'lucide-react';

const Cards = ({ data }) => {
  const {
    _id,
    product_name,
    product_image,
    category,
    product_price,
    instructor,
    duration,
    prize,
    product_video,  // Assuming 'product_video' is the field for the video file URL
  } = data;

  return (
    <Link
      to={`/productdetail/${_id}`}
      className="relative flex flex-col justify-start overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700"
      style={{ overflow: "hidden" }} // Enforce containment
    >
      {/* Media Container */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />

        {/* Video or Image */}
        {product_video ? (
          <video
            className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
            controls
          >
            <source src={`http://localhost:9000/${product_video}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
            src={`http://localhost:9000/${product_image}`}
            alt={product_name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg";
            }}
          />
        )}

        {/* Price and Prize Tags */}
        <div className="relative top-4 right-4 flex flex-col gap-2 z-20">
          {product_price && (
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
              <span className="text-sm font-bold text-yellow-500">Rs. {product_price}</span>
            </div>
          )}
          {prize && (
            <div className="bg-yellow-400/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-700" />
              <span className="text-sm font-semibold text-yellow-700">{prize}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            <Tag className="h-3 w-3 mr-1" />
            {category.category_name}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 dark:text-white line-clamp-2">
          {product_name}
        </h3>

        {/* Details */}
        <div className="space-y-2 mb-6">
          {instructor && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <User className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{instructor}</span>
            </div>
          )}

          {duration && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{duration}</span>
            </div>
          )}
        </div>

        {/* View Detail Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-700 to-yellow-600 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Eye className="h-5 w-5" />
          View Details
        </button>
      </div>
    </Link>
  );
};

export default Cards;
