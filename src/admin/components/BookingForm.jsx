import React, { useEffect, useState } from 'react';
import { get, post } from '../../utils/api'; // Import the API utility and post utility
import { FiUser } from 'react-icons/fi'; // Import an icon for customer selection
import toast from 'react-hot-toast'; // Import toast for notifications
import { Link } from 'react-router-dom'; // Import Link for breadcrumbs
import ConfirmationModal from './ConfirmationModal'; // Import ConfirmationModal

const BookingForm = () => {
  const steps = ["Select Client", "Choose Service", "Pick Date/Time", "Confirm"];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    clientId: '', // For registered customer
    isGuest: false, // Toggle for guest booking
    guestName: '',
    guestEmail: '',
    service: '',
    date: '',
    time: '',
    notes: '', // Add notes field
  });
  const [errors, setErrors] = useState({});
  const [customers, setCustomers] = useState([]); // State to store registered customers
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true); // Loading state for customers
  const [services, setServices] = useState([]); // New state to store available services
  const [isLoadingServices, setIsLoadingServices] = useState(true); // New loading state for services

  // States for searchable customer dropdown and info display
  const [searchTermCustomer, setSearchTermCustomer] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState(null);

  // States for searchable service dropdown
  const [searchTermService, setSearchTermService] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  // State for confirmation modal
  const [isConfirmSubmitModalOpen, setIsConfirmSubmitModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingCustomers(true);
      setIsLoadingServices(true);
      try {
        // Fetch customers
        const customerResponse = await get('/api/customers.php'); // Assuming this endpoint exists
        // Dummy data for customers with type and phone for demonstration
        const dummyCustomers = [
          { id: 'cust1', name: 'John Doe', email: 'john@example.com', phone: '111-222-3333', type: 'Individual' },
          { id: 'org1', name: 'Acme Corp', email: 'contact@acmecorp.com', phone: '444-555-6666', type: 'Organization' },
          { id: 'cust2', name: 'Jane Smith', email: 'jane@example.com', phone: '777-888-9999', type: 'Individual' },
          { id: 'org2', name: 'Johnson Ltd', email: 'info@johnsonltd.com', phone: '000-111-2222', type: 'Organization' },
        ];
        const fetchedCustomers = customerResponse.data || dummyCustomers; // Use dummy if API fails
        setCustomers(fetchedCustomers);
        setFilteredCustomers(fetchedCustomers); // Initialize filtered customers with all customers

        // Fetch services
        const serviceResponse = await get('/api/services.php'); // Assuming this endpoint exists
        // Dummy data for services
        const dummyServices = [
          { id: 'serv1', name: 'Oil Change' },
          { id: 'serv2', name: 'Tire Rotation' },
          { id: 'serv3', name: 'Brake Inspection' },
          { id: 'serv4', name: 'Engine Diagnostic' },
        ];
        const fetchedServices = serviceResponse.data || dummyServices; // Use dummy if API fails
        setServices(fetchedServices);
        setFilteredServices(fetchedServices); // Initialize filtered services with all services

      } catch (err) {
        toast.error('Failed to load data.');
        console.error('Failed to load data:', err);
      } finally {
        setIsLoadingCustomers(false);
        setIsLoadingServices(false);
      }
    };
    fetchData();
  }, []);

  const validateStep = () => {
    let newErrors = {};
    let isValid = true;

    if (currentStep === 0) { // Select Client step
      if (formData.isGuest) {
        if (!formData.guestName) {
          newErrors.guestName = "Guest Name is required";
          isValid = false;
        }
        if (!formData.guestEmail) {
          newErrors.guestEmail = "Guest Email is required";
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.guestEmail)) {
          newErrors.guestEmail = "Invalid email address";
          isValid = false;
        }
      } else {
        if (!formData.clientId) {
          newErrors.clientId = "Please select a client";
          isValid = false;
        }
      }
    } else if (currentStep === 1) { // Choose Service step
      if (!formData.service) {
        newErrors.service = "Service is required";
        isValid = false;
      }
    } else if (currentStep === 2) { // Pick Date/Time step
      if (!formData.date) {
        newErrors.date = "Date is required";
        isValid = false;
      } else {
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today to start of day
        if (selectedDate < today) {
          newErrors.date = "Cannot select a past date";
          isValid = false;
        }
      }
      if (!formData.time) {
        newErrors.time = "Time is required";
        isValid = false;
      }
    }
    // Step 3 (Confirm) doesn't have specific validation beyond previous steps

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for the field being changed
    setErrors({ ...errors, [name]: '' });
  };

  // Handler for customer search input
  const handleCustomerSearchChange = (e) => {
    const term = e.target.value;
    setSearchTermCustomer(term);
    if (term.length > 0) {
      setFilteredCustomers(
        customers.filter(customer =>
          customer.name.toLowerCase().includes(term.toLowerCase()) ||
          (customer.email && customer.email.toLowerCase().includes(term.toLowerCase())) ||
          (customer.type && customer.type.toLowerCase().includes(term.toLowerCase())) // Filter by type
        )
      );
    } else {
      setFilteredCustomers(customers);
    }
    // Clear selected customer details if search term changes
    setSelectedCustomerDetails(null);
    setFormData(prev => ({ ...prev, clientId: '' }));
  };

  // Handler for selecting a customer from the filtered list
  const handleCustomerSelect = (customer) => {
    setFormData(prev => ({ ...prev, clientId: customer.id }));
    setSearchTermCustomer(`${customer.name} (${customer.type})`); // Display selected customer's name and type
    setSelectedCustomerDetails(customer); // Set full details
    setFilteredCustomers([]); // Clear suggestions
    setErrors({ ...errors, clientId: '' }); // Clear any client ID error
  };

  // New handler for service search input
  const handleServiceSearchChange = (e) => {
    const term = e.target.value;
    setSearchTermService(term);
    if (term.length > 0) {
      setFilteredServices(
        services.filter(service =>
          service.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredServices(services);
    }
    setFormData(prev => ({ ...prev, service: '' })); // Clear selected service if search term changes
  };

  // New handler for selecting a service from the filtered list
  const handleServiceSelect = (service) => {
    setFormData(prev => ({ ...prev, service: service.name }));
    setSearchTermService(service.name); // Display selected service's name in search input
    setFilteredServices([]); // Clear suggestions
    setErrors({ ...errors, service: '' }); // Clear any service error
  };

  const handleOpenConfirmSubmitModal = () => {
    if (validateStep()) {
      setIsConfirmSubmitModalOpen(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setIsConfirmSubmitModalOpen(false); // Close modal
    try {
      const payload = {
        service: formData.service,
        date: formData.date,
        time: formData.time,
        status: 'Pending', // Default status for new bookings
      };

      if (formData.isGuest) {
        payload.userType = 'Guest';
        payload.guestName = formData.guestName;
        payload.guestEmail = formData.guestEmail;
      } else {
        payload.userType = 'Registered';
        payload.clientId = formData.clientId;
      }
      payload.notes = formData.notes; // Include notes in the payload

      // Send data to backend
      const response = await post('/api/bookings.php', payload); // Assuming post utility exists
      if (response.success) {
        toast.success("Booking Submitted Successfully!");
        setCurrentStep(0); // Reset form
        setFormData({
          clientId: '',
          isGuest: false,
          guestName: '',
          guestEmail: '',
          service: '',
          date: '',
          time: '',
          notes: '', // Reset notes field
        });
        setErrors({});
        setSearchTermCustomer(''); // Reset customer search term
        setSelectedCustomerDetails(null); // Reset selected customer details
        setSearchTermService(''); // Reset service search term
      } else {
        toast.error(response.message || "Failed to submit booking.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during submission.");
      console.error("Booking submission error:", error);
    }
  };

  const handleToggleGuest = () => {
    setFormData(prev => ({
      ...prev,
      isGuest: !prev.isGuest,
      clientId: '', // Clear selected client if switching to guest
      guestName: '', // Clear guest details if switching from guest
      guestEmail: '',
    }));
    setErrors({}); // Clear errors on toggle
    setSearchTermCustomer(''); // Clear customer search term on toggle
    setSelectedCustomerDetails(null); // Clear selected customer details on toggle
    setSearchTermService(''); // Clear service search term on toggle
  };

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderStepContent = () => {
    // Get selected client and service for summary display in Step 3
    const currentSelectedClient = formData.isGuest
      ? { name: formData.guestName, type: 'Guest' }
      : customers.find(c => c.id === formData.clientId);
    const currentSelectedService = services.find(s => s.name === formData.service);

    switch (currentStep) {
      case 0:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Step 1: Select Client</h3>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="isGuest"
                name="isGuest"
                checked={formData.isGuest}
                onChange={handleToggleGuest}
                className="mr-2"
              />
              <label htmlFor="isGuest" className="text-sm font-medium text-gray-200">Book as a New Guest?</label>
            </div>

            {formData.isGuest ? (
              // Guest Fields
              <>
                <div className="mb-4">
                  <label htmlFor="guestName" className="block text-sm font-medium text-gray-7200">Guest Name:</label>
                  <input
                    type="text"
                    name="guestName"
                    id="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.guestName ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Guest's Full Name"
                  />
                  {errors.guestName && <p className="text-red-500 text-xs mt-1">{errors.guestName}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="guestEmail" className="block text-sm font-medium text-gray-200">Guest Email:</label>
                  <input
                    type="email"
                    name="guestEmail"
                    id="guestEmail"
                    value={formData.guestEmail}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.guestEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="guest@example.com"
                  />
                  {errors.guestEmail && <p className="text-red-500 text-xs mt-1">{errors.guestEmail}</p>}
                </div>
              </>
            ) : (
              // Registered Client Selection with Search and Info Display
              <div className="mb-4 relative"> {/* Added relative for absolute positioning of suggestions */}
                <label htmlFor="customerSearch" className="block text-sm font-medium text-gray-200">Search Registered Client:</label>
                <input
                  type="text"
                  id="customerSearch"
                  value={searchTermCustomer}
                  onChange={handleCustomerSearchChange}
                  className={`text-black mt-1 block w-full px-3 py-2 border ${errors.clientId ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  placeholder="Search by name or email..."
                />
                {searchTermCustomer.length > 0 && filteredCustomers.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                    {filteredCustomers.map(customer => (
                      <li
                        key={customer.id}
                        onClick={() => handleCustomerSelect(customer)}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-900"
                      >
                        {customer.name} ({customer.type})
                      </li>
                    ))}
                  </ul>
                )}
                {errors.clientId && <p className="text-red-500 text-xs mt-1">{errors.clientId}</p>}

                {selectedCustomerDetails && !formData.isGuest && (
                  <div className="mt-2 p-2 bg-blue-50 rounded-md text-sm text-blue-700">
                    <p><strong>Email:</strong> {selectedCustomerDetails.email || 'N/A'}</p>
                    <p><strong>Phone:</strong> {selectedCustomerDetails.phone || 'N/A'}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Step 2: Choose Service</h3>
            {/* <h3 className="text-xl font-semibold mb-4 text-gray-800"></h3> */}
            <div className="mb-4 relative"> {/* Added relative for absolute positioning of suggestions */}
              <label htmlFor="serviceSearch" className="block text-sm font-medium text-gray-300">Service Type:</label>
              <input
                type="text"
                id="serviceSearch"
                name="service"
                value={searchTermService}
                onChange={handleServiceSearchChange}
                className={`text-black mt-1 block w-full px-3 py-2 border ${errors.service ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Search for a service..."
              />
              {searchTermService.length > 0 && filteredServices.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {filteredServices.map(service => (
                    <li
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-900"
                    >
                      {service.name}
                    </li>
                  ))}
                </ul>
              )}
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Step 3: Pick Date/Time & Notes</h3>
            {/* UX Touch: Show selected client and service summary */}
            <div className="mb-4 p-3 bg-indigo-50 rounded-md border border-indigo-200 text-sm text-indigo-700">
              <p><strong>Client:</strong> {currentSelectedClient ? `${currentSelectedClient.name} (${currentSelectedClient.type})` : 'N/A'}</p>
              <p><strong>Service:</strong> {currentSelectedService ? currentSelectedService.name : 'N/A'}</p>
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                min={getTodayDate()} // Restrict to today or future dates
                className={`text-black mt-1 block w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time:</label>
              <input
                type="time"
                name="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                required={true}
                step="900" // 15-minute intervals (900 seconds)
                className={`text-black mt-1 block w-full px-3 py-2 border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Optional Notes:</label>
              <textarea
                name="notes"
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Any special requests or details..."
              ></textarea>
            </div>
          </div>
        );
      case 3:
        const selectedClient = formData.isGuest
          ? { name: formData.guestName, email: formData.guestEmail, type: 'Guest' }
          : customers.find(c => c.id === formData.clientId);
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Step 4: Confirm Booking</h3>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-2">Booking Summary:</h4>
              <p className="text-sm text-gray-700"><strong>Client Type:</strong> {formData.isGuest ? 'Guest' : 'Registered'}</p>
              {selectedClient && (
                <>
                  <p className="text-sm text-gray-700"><strong>Client Name:</strong> {selectedClient.name || 'N/A'}</p>
                  <p className="text-sm text-gray-700"><strong>Client Email:</strong> {selectedClient.email || 'N/A'}</p>
                  <p className="text-sm text-gray-700"><strong>Client Phone:</strong> {selectedClient.phone || 'N/A'}</p>
                </>
              )}
              <p className="text-sm text-gray-700"><strong>Service:</strong> {formData.service || 'N/A'}</p>
              <p className="text-sm text-gray-700"><strong>Date:</strong> {formData.date || 'N/A'}</p>
              <p className="text-sm text-gray-700"><strong>Time:</strong> {formData.time || 'N/A'}</p>
              <p className="text-sm text-gray-700"><strong>Notes:</strong> {formData.notes || 'None'}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg rounded-lg shadow-md pt-0.5 dark:bg-gray-700">
      <h1 className="text-4xl font-extrabold text-gray-200 mb-1">Book a client</h1>
      <nav className="text-gray-500 text-sm mb-8">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/admin/dashboard" className="dark:text-gray-200 hover:underline">Admin</Link>
            <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li className="flex items-center">
            <Link to="/admin/bookings" className="dark:text-gray-200 hover:underline">Bookings</Link>
            <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li>New</li>
        </ol>
      </nav>

      {/* Progress Stepper */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-8 mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center flex-1 mb-4 sm:mb-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-black font-bold transition-colors duration-300 ${
                index <= currentStep ? 'dark:text-[#ECBE07]' : 'bg-gray-300'
              }`}>
                {index + 1}
              </div>
              <div className={`text-sm mt-2 text-center transition-colors duration-300 ${index <= currentStep ? 'dark:text-[#ECBE07] font-semibold' : 'text-gray-500'}`}>
                {step}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-full h-0.5 bg-gray-300 transition-colors duration-300 ${
                index < currentStep ? 'dark:text-[#ECBE07]' : 'bg-gray-300'
              }`} style={{ width: 'calc(100% / 3)' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content with Animation */}
      <div className="mb-8 transition-opacity duration-500 ease-in-out">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          Back
        </button>
        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleOpenConfirmSubmitModal} // Changed to open confirmation modal
            className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
          >
            Submit Booking
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
          >
            Next
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {isConfirmSubmitModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmSubmitModalOpen}
          onClose={() => setIsConfirmSubmitModalOpen(false)}
          onConfirm={handleConfirmSubmit}
          title="Confirm Booking Submission"
          message="Are you sure you want to submit this booking?"
          confirmButtonText="Submit"
        />
      )}
    </div>
  );
};

export default BookingForm;
