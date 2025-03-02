// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CategoryList = () => {
//   const [category, setCategory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setLoading(true);
//     axios.get(`/api/categoryList`)
//       .then(res => {
//         setCategory(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   const filteredCategories = category.filter(cat => 
//     cat.category_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const deleteCategory = (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this category?");
//     if (confirmed) {
//       axios.delete(`/api/deleteCategory/${id}`)
//         .then(res => {
//           setCategory(prevCategories => prevCategories.filter(cat => cat._id !== id));
//           alert("Category deleted successfully");
//         })
//         .catch(err => {
//           console.error(err);
//           alert("Failed to delete category");
//         });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] bg-gray-100">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
//         <span className="ml-3 text-gray-600">Loading categories...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white shadow-lg rounded-xl border border-gray-200">
//       {/* Header Section */}
//       <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
//         <p className="mt-1 text-gray-500">Manage your class categories</p>

//         {/* Search Bar */}
//         <div className="mt-4">
//           <input
//             type="text"
//             placeholder="Search categories..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-purple-400 transition-colors duration-200"
//           />
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="p-4">
//         <div className="overflow-hidden rounded-lg border border-gray-300">
//           <table className="w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Category Name</th>
//                 <th className="px-6 py-4 text-right text-sm font-medium text-gray-700"></th>
//                 {/* add action button in above th */}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredCategories.length > 0 ? (
//                 filteredCategories.map((data, index) => (
//                   <tr 
//                     key={index}
//                     className="hover:bg-gray-100 transition-colors duration-200"
//                   >
//                     <td className="px-6 py-4">
//                       <span className="text-gray-800 font-medium">
//                         {data.category_name}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex justify-end space-x-3">
//                         {/* <button
//                           onClick={() => deleteCategory(data._id)}
//                           className="px-3 py-1.5 text-sm font-medium text-red-500 hover:text-red-400 hover:bg-red-100 rounded-md transition-colors duration-200 border border-red-200"
//                         >
//                           Delete
//                         </button> */}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="2" className="px-6 py-8 text-center text-gray-500">
//                     {searchTerm ? "No categories found matching your search" : "No categories available"}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import toast from "react-hot-toast";

const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/categoryList`)
      .then(res => {
        setCategory(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filteredCategories = category.filter(cat => 
    cat.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteCategory = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (confirmed) {
      axios.delete(`/api/deleteCategory/${id}`)
        .then(res => {
          setCategory(prevCategories => prevCategories.filter(cat => cat._id !== id));
          toast.success("Category deleted successfully!");
        })
        .catch(err => {
          console.error(err);
          toast.error("Failed to delete category!");
        });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        <span className="ml-3 text-gray-600">Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl border border-gray-200">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
        <p className="mt-1 text-gray-500">Manage your class categories</p>

        {/* Search Bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-purple-400 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="p-4">
        <div className="overflow-hidden rounded-lg border border-gray-300">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Category Name</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((data, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <span className="text-gray-800 font-medium">
                        {data.category_name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => deleteCategory(data._id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors duration-200 border border-red-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-8 text-center text-gray-500">
                    {searchTerm ? "No categories found matching your search" : "No categories available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
