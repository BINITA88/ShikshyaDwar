import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const param = useParams();
  const id = param.productId;

  useEffect(() => {
    axios
      .get(`/api/productDetail/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const addtoCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const productItem = {
      id: product._id,
      name: product.product_name,
      price: product.product_price,
      countInStock: product.countInStock,
      image: product.product_image,
      description: product.product_description,
      category: product.category,
      quantity: 1,
    };

    const existingItem = cartItems.find(item => item.id === product._id);
    if (existingItem) {
      toast.error("Item is already present in your cart!");
    } else {
      cartItems.push(productItem);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      toast.success(`${productItem.name} added to the cart!`);
    }
  };

  // Change image function for thumbnails
  const changeImage = (src) => {
    document.getElementById('mainImage').src = src;
  };

  return (
    <>
      <ToastContainer theme='colored' position='top-center'/>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            {/* Left Column */}
            <div className="w-full md:w-1/2 px-4 mb-8">
              {/* Main Image */}
              <img
                src={`http://localhost:9000/${product.product_image}`} // Dynamic main image source
                alt="Product"
                className="w-full h-auto rounded-lg shadow-md mb-4"
                id="mainImage"
              />
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                {product.product_images?.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:9000/${img}`} // Assuming product.images contains an array of image URLs
                    alt={`Thumbnail ${index + 1}`}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() => changeImage(`http://localhost:9000/${img}`)}
                  />
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">{product.product_name}</h2>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">Rs.{product.product_price}</span>
                <span className="text-gray-500 line-through">$399.99</span>
              </div>
              <p className="text-gray-700 mb-6">{product.product_description}</p>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={addtoCart}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
                  Wishlist
                </button>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Industry-leading noise cancellation</li>
                  <li>30-hour battery life</li>
                  <li>Touch sensor controls</li>
                  <li>Speak-to-chat technology</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
