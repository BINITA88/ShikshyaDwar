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
    // Retrieve cart items from localStorage or initialize as an empty array
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

    // Check if the item is already present in the cart
    const existingItem = cartItems.find(item => item.id === product._id);
    if (existingItem) {
        toast.error("Item is already present in your cart!");
    } else {
        // Add the new item to the cart
        cartItems.push(productItem);

        // Save the updated cart items to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Show success toast
        toast.success(`${productItem.name} added to the cart!`);
    }
};

  return (
    <>
    <ToastContainer theme='colored' position='top-center'/>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            {/* Left Column */}
            <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Product"
                className="w-full h-auto rounded-lg shadow-md mb-4"
                id="mainImage"
              />
              <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                <img
                  src="https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="Thumbnail 1"
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => changeImage(this.src)}
                />
                <img
                  src="https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="Thumbnail 2"
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => changeImage(this.src)}
                />
                <img
                  src="https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="Thumbnail 3"
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => changeImage(this.src)}
                />
                <img
                  src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
                  alt="Thumbnail 4"
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => changeImage(this.src)}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">{product.product_name}</h2>
              {/* letter finding out problem of category */}
              {/* <p className="text-gray-600 mb-4">{product.category.category_name}</p> */}
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">Rs.{product.product_price}</span>
                <span className="text-gray-500 line-through">$399.99</span>
              </div>
              {/* Ratings */}
              <div className="flex items-center mb-4">
                {/* Add rating stars */}
              </div>
              <p className="text-gray-700 mb-6">
              {product.product_description}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Color:</h3>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-black rounded-full"></button>
                  <button className="w-8 h-8 bg-gray-300 rounded-full"></button>
                  <button className="w-8 h-8 bg-blue-500 rounded-full"></button>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
                <input type="number" id="quantity" name="quantity" min="1" value="1" className="w-12 text-center rounded-md" />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                
                onClick={addtoCart}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">Add to Cart</button>
                <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">Wishlist</button>
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
