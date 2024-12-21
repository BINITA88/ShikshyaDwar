import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { productId } = useParams();
  const { token } = isAuthenticated();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState({
    product_name: '',
    product_price: '',
    product_description: '',
    countInStock: '',
    product_image: '',
    category: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onHandleInput = (e) => {
    const { name, value } = e.target;
    setProduct((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const onHandleImage = (e) => {
    setProduct((preState) => ({
      ...preState,
      product_image: e.target.files[0],
    }));
  };

  useEffect(() => {
    // Fetch categories
    axios
      .get(`/api/categoryList`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));

    // Fetch product data
    axios
      .get(`/api/productDetails/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const productData = res.data;
        setProduct({
          product_name: productData.product_name,
          product_price: productData.product_price,
          product_description: productData.product_description,
          countInStock: productData.countInStock,
          product_image:productData.product_image, // Images aren't directly editable in this form
          category: productData.category?._id || '',
        });
      })
      .catch((err) => console.log(err));
  }, [productId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product_name', product.product_name);
    formData.append('product_price', product.product_price);
    formData.append('product_description', product.product_description);
    formData.append('countInStock', product.countInStock);
    if (product.product_image) {
      formData.append('product_image', product.product_image);
    }
    formData.append('category', product.category);

    try {
      await axios.put(`/api/updateproduct/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      setError('');
      setTimeout(() => navigate('/admin/productlist'), 200); // Redirect after success
    } catch (err) {
      setError('Failed to update product');
      console.log(err);
    }
  };

  const showError = () =>
    error && (
      <div className="bg-red-100 text-red-800 p-4 rounded-lg" role="alert">
        <strong className="font-bold text-sm mr-2">Error!</strong>
        <span className="block text-sm sm:inline">{error}</span>
      </div>
    );

  const showSuccess = () =>
    success && (
      <div className="bg-green-100 text-green-800 p-4 rounded-lg" role="alert">
        <strong className="font-bold text-sm mr-2">Success!</strong>
        <span className="block text-sm sm:inline">Product updated successfully!</span>
      </div>
    );

  return (
    <>
      {showError()}
      {showSuccess()}
      <form className="lg:p-16 p-6" onSubmit={handleSubmit}>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Product Name</label>
          <input
            type="text"
            name="product_name"
            className="block w-full px-4 py-2 border rounded"
            value={product.product_name}
            onChange={onHandleInput}
            required
          />
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Product Price</label>
          <input
            type="number"
            name="product_price"
            className="block w-full px-4 py-2 border rounded"
            value={product.product_price}
            onChange={onHandleInput}
            required
          />
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Quantity in Stock</label>
          <input
            type="number"
            name="countInStock"
            className="block w-full px-4 py-2 border rounded"
            value={product.countInStock}
            onChange={onHandleInput}
            required
          />
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Product Description</label>
          <textarea
            name="product_description"
            className="block w-full px-4 py-2 border rounded"
            value={product.product_description}
            onChange={onHandleInput}
            required
          ></textarea>
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Product Image</label>
          {product.product_image && (
            <>
            <div className='mb-4' >
              <img src={'https'} alt="pre_image" className="w-20 h-20 object-cover" />mb-2

            </div>
            </>
          )}
          <input
          name="product_image"
            type="file"
            className="block w-full px-4 py-2 border rounded"
            
            onChange={onHandleImage}
          />
        </div>
        <div className="relative mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Category</label>
          <select
            name="category"
            className="block w-full px-4 py-2 border rounded"
            value={product.category}
            onChange={onHandleInput}
            required
          >
            <option value="">Select Category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>
        <button className="w-full px-4 py-2 text-white bg-indigo-600 rounded">
          Submit
        </button>
      </form>
    </>
  );
};

export default UpdateProduct;
