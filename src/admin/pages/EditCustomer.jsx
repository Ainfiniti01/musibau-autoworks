import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal'; // Import ConfirmationModal

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    organization: '',
    status: 'Active', // New field for customer status
    createdAt: '',
    updatedAt: '',
  });
  const [organizations, setOrganizations] = useState([]); // State for organizations dropdown
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State for confirmation modal

  useEffect(() => {
    const fetchCustomerAndOrganizations = async () => {
      try {
        // Simulate fetching customer data from API
        const mockCustomer = {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
          address: '123 Main St, Anytown, USA',
          organization: 'Global Solutions',
          status: 'Active',
          createdAt: '2023-01-15T10:00:00Z',
          updatedAt: '2024-08-20T14:30:00Z',
        };
        setCustomer(mockCustomer);

        // Simulate fetching organizations
        const mockOrganizations = [
          { id: 'org1', name: 'Global Solutions' },
          { id: 'org2', name: 'Tech Innovators' },
          { id: 'org3', name: 'Creative Minds' },
        ];
        setOrganizations(mockOrganizations);

        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to fetch data.');
        setIsLoading(false);
      }
    };

    fetchCustomerAndOrganizations();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!customer.name) {
      newErrors.name = 'Customer name is required.';
      isValid = false;
    }
    if (!customer.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }
    if (!customer.phone) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(customer.phone)) { // Basic phone format validation (e.g., XXX-XXX-XXXX)
      newErrors.phone = 'Invalid phone format (e.g., 123-456-7890).';
      isValid = false;
    }
    if (!customer.address) {
      newErrors.address = 'Address is required.';
      isValid = false;
    }
    if (!customer.organization) {
      newErrors.organization = 'Organization is required.';
      isValid = false;
    }
    if (!customer.status) {
      newErrors.status = 'Status is required.';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsConfirmationModalOpen(true); // Open confirmation modal on submit
  };

  const confirmSave = async () => {
    setIsConfirmationModalOpen(false); // Close modal immediately
    try {
      // Simulate API call to update customer data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Customer updated successfully!');
      navigate(`/admin/customers/${id}`);
    } catch (error) {
      toast.error('Failed to update customer.');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Details */}
        <div className="bg-white p-6 rounded-lg shadow-md ">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Customer Details</h3>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={customer.name}
              onChange={handleChange}
              className="text-black mt-3 p-1 rounded-smd block w-full shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              autoFocus // Autofocus on the first input field
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={customer.status}
              onChange={handleChange}
              className="text-black mt-3 p-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="VIP">VIP</option>
              <option value="Lead">Lead</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
              Organization
            </label>
            <select
              id="organization"
              name="organization"
              value={customer.organization}
              onChange={handleChange}
              className="text-black mt-3 p-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select an Organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.name}>
                  {org.name}
                </option>
              ))}
            </select>
            {errors.organization && <p className="text-red-500 text-sm">{errors.organization}</p>}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              className="text-black mt-3 p-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <p className="mt-1 text-sm text-gray-500">e.g., example@domain.com</p>
          </div>
          <div className="mt-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              className="text-black mt-3 p-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            <p className="mt-1 text-sm text-gray-500">e.g., 123-456-7890</p>
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={customer.address}
              onChange={handleChange}
              className="text-black mt-3 p-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
        </div>

        {/* Audit Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Audit Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Created At</label>
              <p className="mt-1 text-sm text-gray-900">{new Date(customer.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Updated</label>
              <p className="mt-1 text-sm text-gray-900">{new Date(customer.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate(`/admin/customers/${id}`)}
            className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={confirmSave}
          title="Confirm Save"
          customerName={customer.name}
          confirmButtonText="Save Changes"
        />
      )}
    </div>
  );
};

export default EditCustomer;
