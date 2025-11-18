import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal'; // Import ConfirmationModal

const EditOrganization = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState({
    name: '',
    email: '',
    phone: '',
    industry: '',
    address: '',
    status: 'Active', // New field for organization status
    createdAt: '',
    updatedAt: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State for confirmation modal

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        // Simulate fetching organization data from API
        const mockOrganization = {
          id: 1,
          name: 'Global Solutions',
          email: 'contact@globalsolutions.com',
          phone: '444-555-6666',
          address: '456 Business Ave, Metro City, USA',
          industry: 'Technology',
          status: 'Active',
          createdAt: '2022-05-10T10:00:00Z',
          updatedAt: '2024-08-21T12:00:00Z',
        };
        setOrganization(mockOrganization);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to fetch organization data.');
        setIsLoading(false);
      }
    };

    fetchOrganization();
  }, [id]);

  const handleChange = (e) => {
    setOrganization({ ...organization, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!organization.name) {
      newErrors.name = 'Organization name is required.';
      isValid = false;
    }
    if (!organization.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(organization.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }
    if (!organization.phone) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(organization.phone)) { // Basic phone format validation (e.g., XXX-XXX-XXXX)
      newErrors.phone = 'Invalid phone format (e.g., 123-456-7890).';
      isValid = false;
    }
    if (!organization.address) {
      newErrors.address = 'Address is required.';
      isValid = false;
    }
    if (!organization.industry) {
      newErrors.industry = 'Industry is required.';
      isValid = false;
    }
    if (!organization.status) {
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
      // Simulate API call to update organization data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Organization updated successfully!');
      navigate(`/admin/organizations/${id}`);
    } catch (error) {
      toast.error('Failed to update organization.');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Organization</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organization Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Organization Details</h3>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={organization.name}
              onChange={handleChange}
              className="text-black mt-3 p-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              value={organization.status}
              onChange={handleChange}
              className="text-black mt-3 p-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Partner">Partner</option>
              <option value="Prospect">Prospect</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={organization.industry}
              onChange={handleChange}
              className="text-black mt-3 p-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select an Industry</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
            </select>
            {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
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
              value={organization.email}
              onChange={handleChange}
              className="text-black mt-3 p-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            {/* <p className="mt-1 text-sm text-gray-500">
              e.g., example@domain.com</p> */}
          </div>
          <div className="mt-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={organization.phone}
              onChange={handleChange}
              className="text-black mt-3 p-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            {/* <p className="mt-1 text-sm text-gray-500">e.g., 123-456-7890</p> */}
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={organization.address}
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
              <p className="mt-1 text-sm text-gray-900">{new Date(organization.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Updated</label>
              <p className="mt-1 text-sm text-gray-900">{new Date(organization.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate(`/admin/organizations/${id}`)}
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
          customerName={organization.name} // Reusing customerName prop for organization name
          confirmButtonText="Save Changes"
        />
      )}
    </div>
  );
};

export default EditOrganization;
