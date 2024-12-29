import React, { useState } from "react";
import { isAuthenticated } from "../../auth";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const AddCategory = () => {
  const [category_name, setCategory] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = isAuthenticated();

  const onHandleChange = (e) => {
    setError('');
    setCategory(e.target.value.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!category_name.trim()) {
      setError('Category name is required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/postcategory`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ category_name })
      });

      const data = await response.json();

      if (data && data.error) {
        setError(data.error);
      } else {
        setError('');
        setSuccess(true);
        setCategory('');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Add New Category</h2>
          <p className="mt-2 text-gray-600">Create a new category for organizing courses</p>
        </div>

        {/* Alerts Container */}
        <div className="max-w-lg mx-auto mb-6">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-700">Category has been created successfully</p>
            </div>
          )}
        </div>

        {/* Form Card */}
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="category_name" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="category_name"
                  value={category_name}
                  onChange={onHandleChange}
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm 
                           focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
                           transition-colors duration-200 text-sm"
                  placeholder="Enter category name"
                  required
                />
                <p className="mt-1.5 text-xs text-gray-500">
                  Use a unique and descriptive name for the category
                </p>
              </div>

              <div className="flex items-center justify-end pt-4 space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setCategory('');
                    setError('');
                    setSuccess(false);
                  }}
                  className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium
                           text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-md bg-pink-600 text-sm font-medium text-white 
                           hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                           focus:ring-pink-500 transition-colors duration-200 
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Creating...
                    </>
                  ) : (
                    'Create Category'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;