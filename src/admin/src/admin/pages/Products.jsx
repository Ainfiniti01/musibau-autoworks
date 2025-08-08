import React, { useState } from 'react';
import ProductForm from '../components/ProductForm'; // Import ProductForm
import { toast } from 'react-toastify'; // Import toast
import AdminLayout from '../layout/AdminLayout'; // Import AdminLayout
import { FiPlus } from 'react-icons/fi'; // Import FiPlus icon
import { formatCurrency } from '../../utils/formatCurrency'; // Import formatCurrency utility

const Products = () => {
  // Mock data for products, now using useState
  const [products, setProducts] = useState([
    { id: 1, name: 'Engine Oil', price: 15, image: 'oil.jpg' },
    { id: 2, name: 'Tire', price: 100, image: 'tire.jpg' },
    { id: 3, name: 'Brake Pads', price: 50, image: 'brakes.jpg' },
    { id: 4, name: 'Spark Plugs', price: 20, image: 'sparkplugs.jpg' },
    { id: 5, name: 'Air Filter', price: 25, image: 'airfilter.jpg' },
    { id: 6, name: 'Wiper Blades', price: 30, image: 'wiperblades.jpg' },
    { id: 7, name: 'Headlight Bulb', price: 10, image: 'headlight.jpg' },
    { id: 8, name: 'Battery', price: 150, image: 'battery.jpg' },
    { id: 9, name: 'Brake Fluid', price: 12, image: 'brakefluid.jpg' },
    { id: 10, name: 'Coolant', price: 18, image: 'coolant.jpg' },
    { id: 11, name: 'Oil Filter', price: 10, image: 'oilfilter.jpg' },
    { id: 12, name: 'Cabin Filter', price: 35, image: 'cabinfilter.jpg' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [editingProduct, setEditingProduct] = useState(null); // State to hold the product being edited
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // State for delete confirmation modal
  const [productToDeleteId, setProductToDeleteId] = useState(null); // State to hold the ID of the product to delete
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 5; // Number of items per page

  const handleAddProduct = (newProduct) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === editingProduct.id ? { ...newProduct, id: product.id } : product
        )
      );
      toast.success('Product updated successfully!'); // Use toast for success
    } else {
      // Add new product
      const productWithId = { ...newProduct, id: products.length + 1 };
      setProducts(prevProducts => [...prevProducts, productWithId]);
      toast.success('Product added successfully!'); // Use toast for success
    }
    setIsModalOpen(false); // Hide modal
    setEditingProduct(null); // Clear editing product
  };

  const handleEditProduct = (productToEdit) => {
    setEditingProduct(productToEdit); // Set the product to be edited
    setIsModalOpen(true); // Open the modal
  };

  const handleDeleteProduct = (productId) => {
    setProductToDeleteId(productId); // Set the ID of the product to delete
    setDeleteConfirmOpen(true); // Open the delete confirmation modal
  };

  const confirmDelete = () => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productToDeleteId));
    setDeleteConfirmOpen(false);
    toast.success('Product deleted successfully!'); // Use toast for success
    setProductToDeleteId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null); // Clear editing product when closing modal
  };

  const closeDeleteConfirmModal = () => {
    setDeleteConfirmOpen(false);
    setProductToDeleteId(null);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toLowerCase().includes(searchTerm.toLowerCase()) // Basic search on name and price
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // TODO: Replace with actual product list from API
  // TODO: Hook up Add/Edit form to backend

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#ECBE07] mb-8">Manage Products</h1>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label htmlFor="search" className="mr-2 text-gray-700">Search:</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search products..."
            />
          </div>
          <button
            onClick={() => {
              setEditingProduct(null); // Ensure no product is being edited when adding new
              setIsModalOpen(true); // Open modal
            }}
            className="bg-[#ECBE07] text-white px-4 py-2 rounded mb-4 float-right flex items-center gap-2"
          >
            <FiPlus /> Add New Product
          </button>
        </div>

        {/* Product Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                      </h3>
                      <div className="mt-2">
                        <ProductForm onSubmit={handleAddProduct} initialData={editingProduct} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <table className="w-full text-left table-auto rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-[#004040] font-semibold">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => ( // Use currentProducts for pagination
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  {/* Placeholder for image - in a real app, you'd use an img tag */}
                  <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center text-xs">{product.image}</div>
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{formatCurrency(product.price)}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEditProduct(product)} className="bg-[#ECBE07] text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 mx-1 rounded-md border text-sm font-medium ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.364 3.357l-1.094.364a1 1 0 00-.893.893l-1.094 3.636c-.15.501.106 1.02.653 1.215l.773.193c.47.117.97.175 1.47.175h10.002c.5.001.999-.058 1.47-.175l.773-.193c.547-.195.803-.714.653-1.215l-1.094-.364a1 1 0 00-.893-.893l-1.094-.364zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Product
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this product? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={confirmDelete}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={closeDeleteConfirmModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Products;
