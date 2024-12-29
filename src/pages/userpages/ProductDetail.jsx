import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Star, Clock, User, ChevronLeft, ChevronRight, Award, ArrowRight } from 'lucide-react';


const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/productDetail/${productId}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [productId]);

  const handleBooking = () => {
    localStorage.setItem('productDetails', JSON.stringify(product));
    const isAuthenticated = JSON.parse(localStorage.getItem('jwt'));
    navigate(isAuthenticated ? '/booking' : '/login?redirect=Booking');
  };

  const nextImage = () => {
    setIsImageLoaded(false);
    setCurrentImageIndex((prev) => 
      (prev + 1) % (product.product_images?.length || 1)
    );
  };

  const prevImage = () => {
    setIsImageLoaded(false);
    setCurrentImageIndex((prev) =>
      prev === 0 ? (product.product_images?.length - 1) || 0 : prev - 1
    );
  };

  return (
    <div className="min-h-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <ToastContainer theme="colored" position="top-center" />
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative space-y-6">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
                <img
                  src={`http://localhost:9000/${product.product_images?.[currentImageIndex] || product.product_image}`}
                  alt={product.product_name}
                  className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                    isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                />
                {product.product_images?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 p-2.5 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 p-2.5 rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 px-2">
                {product.product_images?.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsImageLoaded(false);
                      setCurrentImageIndex(idx);
                    }}
                    className={`flex-shrink-0 transition-all duration-200 hover:scale-105 ${
                      currentImageIndex === idx 
                        ? 'ring-2 ring-blue-500 shadow-lg' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={`http://localhost:9000/${img}`}
                      alt={`Thumbnail ${idx + 1}`}
                      className="h-16 w-16 object-cover rounded-xl"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8 p-4">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slideUp">
                  {product.product_name}
                </h1>
                <div className="flex items-center gap-4 animate-slideUp">
                  <span className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium">
                    <Award className="h-4 w-4" />
                    Premium
                  </span>
                  <div className="flex items-center bg-yellow-100 px-4 py-1.5 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium text-yellow-800">4.9</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 animate-slideUp">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-xl">
                  <p className="text-3xl font-bold text-blue-600">
                    Rs.{product.product_price}
                  </p>
                  <span className="ml-3 text-lg text-gray-400 line-through">
                    Rs.{Math.round(product.product_price * 1.2)}
                  </span>
                </div>
                <p className="text-sm font-medium text-green-600 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Limited time offer
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg animate-slideUp">
                {product.product_description}
              </p>

              <div className="flex flex-wrap gap-4 animate-slideUp">
                <div className="flex items-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                  <User className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">{product.instructor}</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700">{product.duration}</span>
                </div>
              </div>

              <div className="flex justify-start ">
                <button
                  onClick={handleBooking}
                  className="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 
                            text-white text-lg font-semibold rounded-full overflow-hidden transition-all duration-300
                            hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            animate-slideUp shadow-lg hover:shadow-xl"
                >
                  <span className="mr-2">Enroll Now</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        
    </div>
  );
};

export default ProductDetail;