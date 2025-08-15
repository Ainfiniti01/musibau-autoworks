import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatCurrency';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts([
        { id: 1, name: 'Engine Oil', price: 15, category: 'Fluids', stock: 100, image: 'https://via.placeholder.com/50/FF0000/FFFFFF?text=Oil' },
        { id: 2, name: 'Tire', price: 100, category: 'Tires', stock: 50, image: 'https://via.placeholder.com/50/0000FF/FFFFFF?text=Tire' },
        { id: 3, name: 'Brake Pads', price: 50, category: 'Brakes', stock: 75, image: 'https://via.placeholder.com/50/00FF00/FFFFFF?text=Brake' },
        { id: 4, name: 'Spark Plugs', price: 20, category: 'Engine', stock: 120, image: 'https://via.placeholder.com/50/FFFF00/000000?text=Spark' },
        { id: 5, name: 'Air Filter', price: 25, category: 'Filters', stock: 90, image: 'https://via.placeholder.com/50/FF00FF/FFFFFF?text=Air' },
        { id: 6, name: 'Wiper Blades', price: 30, category: 'Exterior', stock: 60, image: 'https://via.placeholder.com/50/00FFFF/000000?text=Wiper' },
        { id: 7, name: 'Headlight Bulb', price: 10, category: 'Electrical', stock: 200, image: 'https://via.placeholder.com/50/800080/FFFFFF?text=Bulb' },
        { id: 8, name: 'Battery', price: 150, category: 'Electrical', stock: 40, image: 'https://via.placeholder.com/50/FFA500/FFFFFF?text=Battery' },
        { id: 9, name: 'Brake Fluid', price: 12, category: 'Fluids', stock: 110, image: 'https://via.placeholder.com/50/A52A2A/FFFFFF?text=Fluid' },
        { id: 10, name: 'Coolant', price: 18, category: 'Fluids', stock: 80, image: 'https://via.placeholder.com/50/008000/FFFFFF?text=Coolant' },
        { id: 11, name: 'Oil Filter', price: 10, category: 'Filters', stock: 130, image: 'https://via.placeholder.com/50/4B0082/FFFFFF?text=Filter' },
        { id: 12, name: 'Cabin Filter', price: 35, category: 'Filters', stock: 70, image: 'https://via.placeholder.com/50/EE82EE/FFFFFF?text=Cabin' },
      ]);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddProduct = (newProduct) => {
    const actionPromise = new Promise(async (resolve, reject) => {
      await new Promise(res => setTimeout(res, 500));
      if (editingProduct) {
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.id === editingProduct.id ? { ...newProduct, id: product.id } : product
          )
        );
        resolve('Product updated successfully!');
      } else {
        const productWithId = { ...newProduct, id: products.length + 1 };
        setProducts(prevProducts => [...prevProducts, productWithId]);
        resolve('Product added successfully!');
      }
      setIsModalOpen(false);
      setEditingProduct(null);
    });

    toast.promise(actionPromise, {
      loading: editingProduct ? 'Updating product...' : 'Adding product...',
      success: (message) => message,
      error: 'Failed to perform action.',
    });
  };

  const handleEditProduct = (productToEdit) => {
    setEditingProduct(productToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setProductToDeleteId(productId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    const deletePromise = new Promise(async (resolve, reject) => {
      await new Promise(res => setTimeout(res, 500));
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productToDeleteId));
      setDeleteConfirmOpen(false);
      setProductToDeleteId(null);
      resolve('Product deleted successfully!');
    });

    toast.promise(deletePromise, {
      loading: 'Deleting product...',
      success: (message) => message,
      error: 'Failed to delete product.',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const closeDeleteConfirmModal = () => {
    setDeleteConfirmOpen(false);
    setProductToDeleteId(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;

    const matchesStock = (() => {
      if (filterStock === 'all') return true;
      if (filterStock === 'in_stock') return product.stock > 10;
      if (filterStock === 'low_stock') return product.stock <= 10 && product.stock > 0;
      if (filterStock === 'out_of_stock') return product.stock === 0;
      return true;
    })();

    return matchesSearch && matchesCategory && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    }
    if (sortBy === 'stock') {
      return sortOrder === 'asc' ? a.stock - b.stock : b.stock - a.stock;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 dark:text-white">Manage Products</h1>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
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
          <div className="flex items-center gap-2">
            <label htmlFor="categoryFilter" className="mr-2 text-gray-700">Category:</label>
            <select
              id="categoryFilter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Fluids">Fluids</option>
              <option value="Tires">Tires</option>
              <option value="Brakes">Brakes</option>
              <option value="Engine">Engine</option>
              <option value="Filters">Filters</option>
              <option value="Exterior">Exterior</option>
              <option value="Electrical">Electrical</option>
            </select>
            <label htmlFor="stockFilter" className="ml-4 mr-2 text-gray-700">Stock:</label>
            <select
              id="stockFilter"
              value={filterStock}
              onChange={(e) => setFilterStock(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Stock</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            <label htmlFor="sortBy" className="ml-4 mr-2 text-gray-700">Sort By:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="ml-2 px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? 'Asc' : 'Desc'}
            </button>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="bg-primary text-dark hover:bg-yellow-400 transition px-4 py-2 rounded mb-4 float-right flex items-center gap-2"
          >
            <FiPlus /> Add New Product
          </button>
        </div>

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

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No products found.</p>
            ) : (
              <table className="w-full text-left table-auto rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-[#004040] font-semibold">
                  <tr>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                      </td>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{formatCurrency(product.price)}</td>
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2">{product.stock}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => handleEditProduct(product)} className="bg-yellow-500 hover:bg-yellow-600 text-white transition px-3 py-1 rounded flex items-center gap-1">
                          <FiEdit /> Edit
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 hover:bg-yellow-600 text-white transition px-3 py-1 rounded flex items-center gap-1">
                          <FiTrash2 /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-primary text-dark hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 mx-1 rounded-md border text-sm font-medium ${
                      currentPage === page
                        ? 'bg-primary text-dark border-primary'
                        : 'border-gray-300 bg-primary text-dark hover:bg-yellow-400 transition'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-primary text-dark hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

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
    </>
  );
};

export default Products;
