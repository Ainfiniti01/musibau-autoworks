import React, { useState } from 'react';

const BookingForm = () => {
  const steps = ["Choose Service", "Pick Date/Time", "Confirm"];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    customerName: '',
    customerEmail: '',
  });
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors = {};
    let isValid = true;

    if (currentStep === 0 && !formData.service) {
      newErrors.service = "Service is required";
      isValid = false;
    }
    if (currentStep === 1) {
      if (!formData.date) {
        newErrors.date = "Date is required";
        isValid = false;
      }
      if (!formData.time) {
        newErrors.time = "Time is required";
        isValid = false;
      }
    }
    if (currentStep === 2) {
      if (!formData.customerName) {
        newErrors.customerName = "Your Name is required";
        isValid = false;
      }
      if (!formData.customerEmail) {
        newErrors.customerEmail = "Your Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
        newErrors.customerEmail = "Email address is invalid";
        isValid = false;
      }
    }
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

  const handleSubmit = () => {
    if (validateStep()) {
      console.log("Booking Submitted:", formData);
      alert("Booking Submitted Successfully!");
      setCurrentStep(0);
      setFormData({
        service: '',
        date: '',
        time: '',
        customerName: '',
        customerEmail: '',
      });
      setErrors({});
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Step 1: Choose Service</h3>
            <div className="mb-4">
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service:</label>
              <input
                type="text"
                name="service"
                id="service"
                value={formData.service}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.service ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="e.g., Oil Change"
              />
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Step 2: Pick Date/Time</h3>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
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
                className={`mt-1 block w-full px-3 py-2 border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Step 3: Confirm</h3>
            <div className="mb-4">
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Your Name:</label>
              <input
                type="text"
                name="customerName"
                id="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.customerName ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="John Doe"
              />
              {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">Your Email:</label>
              <input
                type="email"
                name="customerEmail"
                id="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.customerEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="john.doe@example.com"
              />
              {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-lg font-medium text-gray-900 mb-2">Booking Summary:</h4>
              <p className="text-sm text-gray-700"><strong>Service:</strong> {formData.service || 'N/A'}</p>
              <p className="text-sm text-gray-700"><strong>Date:</strong> {formData.date || 'N/A'}</p>
              <p className="text-sm text-gray-700"><strong>Time:</strong> {formData.time || 'N/A'}</p>
              <p className="text-sm text-gray-700"><strong>Customer Name:</strong> {formData.customerName || 'N/A'}</p>
              <p className="text-sm text-gray-700"><strong>Customer Email:</strong> {formData.customerEmail || 'N/A'}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">New Booking</h2>

      {/* Progress Stepper */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 relative">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center z-10 flex-1 mb-4 sm:mb-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300 ${
                index <= currentStep ? 'bg-indigo-600' : 'bg-gray-300'
              }`}>
                {index + 1}
              </div>
              <div className={`text-sm mt-2 text-center transition-colors duration-300 ${index <= currentStep ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>
                {step}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`absolute top-5 left-1/2 -translate-x-1/2 w-full h-0.5 bg-gray-300 transition-colors duration-300 ${
                index < currentStep ? 'bg-indigo-600' : 'bg-gray-300'
              }`} style={{ width: 'calc(100% / 3)', left: `calc(${index * (100 / 3)}% + 20px)` }} />
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
          className="px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          Back
        </button>
        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
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
    </div>
  );
};

export default BookingForm;
