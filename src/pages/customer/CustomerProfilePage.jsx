import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionWrapper from '../../components/ui/SectionWrapper';
import ActionButton from '../../components/ui/ActionButton';
import ConfirmationModal from '../../admin/components/ConfirmationModal'; // Reusing admin modal
import ToastPlaceholder from '../../components/ToastPlaceholder'; // For success/error feedback
import CustomerPortalLayout from '../../components/CustomerPortalLayout';

const CustomerProfilePage = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // 'success' or 'error'

  const showFeedback = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };
  // State for Basic Info
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [address, setAddress] = useState('123 Main St, Anytown, USA');
  const [profilePicture, setProfilePicture] = useState(null); // For file upload
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);
  const [isSavingBasicInfo, setIsSavingBasicInfo] = useState(false); // Loading state for basic info

  // State for Password Management
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false); // Loading state for password change
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false); // Loading state for account deletion

  // State for Preferences
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(false);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [bookingRemindersEnabled, setBookingRemindersEnabled] = useState(true); // New state for booking reminders
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // Handlers for Basic Info
  const handleEditBasicInfo = () => {
    setIsEditingBasicInfo(true);
  };

  const handleSaveBasicInfo = async () => {
    // Basic validation
    if (!fullName || !email || !phoneNumber || !address) {
      showFeedback('All basic information fields are required.', 'error');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
      showFeedback('Please enter a valid phone number (e.g., 123-456-7890).', 'error');
      return;
    }

    setIsSavingBasicInfo(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving basic info:', { fullName, email, phoneNumber, address });
      showFeedback('Basic information updated successfully!', 'success');
      setIsEditingBasicInfo(false);
    } catch (error) {
      console.error('Failed to save basic info:', error);
      showFeedback('Failed to update basic information. Please try again.', 'error');
    } finally {
      setIsSavingBasicInfo(false);
    }
  };

  const handleCancelBasicInfo = () => {
    setIsEditingBasicInfo(false);
    // Optionally reset form to current saved values
  };

  const handleProfilePictureChange = (event) => {
    // TODO: Implement profile picture upload logic
    setProfilePicture(event.target.files[0]);
  };

  // Handlers for Password Management
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      showFeedback('All password fields are required.', 'error');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showFeedback('New password and confirm new password do not match.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showFeedback('New password must be at least 6 characters long.', 'error');
      return;
    }
    // Add more complex password validation if needed (e.g., regex for special characters, numbers)

    setIsChangingPassword(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Changing password:', { oldPassword, newPassword, confirmNewPassword });
      showFeedback('Password changed successfully!', 'success');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setIsEditingPassword(false);
    } catch (error) {
      console.error('Failed to change password:', error);
      showFeedback('Failed to change password. Please try again.', 'error');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Handlers for Preferences
  const handleNotificationChange = (event) => {
    setNotificationsEnabled(event.target.checked);
    showFeedback('Notifications preference updated.', 'success');
  };

  const handleBookingRemindersChange = (event) => {
    setBookingRemindersEnabled(event.target.checked);
    showFeedback('Booking reminders preference updated.', 'success');
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  // Handlers for Account Actions
  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      // Simulate actual account deletion API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Account deleted!');
      showFeedback('Your account has been successfully deleted.', 'success');
      setShowDeleteModal(false);
      navigate('/'); // Redirect to home or login page after deletion
    } catch (error) {
      console.error('Failed to delete account:', error);
      showFeedback('Failed to delete account. Please try again.', 'error');
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteModal(false);
  };

  // Handler for Logout
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
    showFeedback('You have been logged out.', 'success');
    navigate('/login'); // Redirect to login page after logout
  };

  const navigate = useNavigate();

  return (
    <CustomerPortalLayout>
        {showToast && <ToastPlaceholder message={toastMessage} type={toastType} />}
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={cancelDeleteAccount}
          onConfirm={confirmDeleteAccount}
          title="Confirm Account Deletion"
          message="Are you sure you want to delete your account? This action cannot be undone."
        />
        <p className="text-lg text-gray-200 mb-8">Manage your personal information and preferences.</p>

        {/* Section 1: Basic Info */}
        <SectionWrapper title="Basic Information">
          {!isEditingBasicInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-600 font-bold">Full Name:</p>
                <p>{fullName}</p>
              </div>
              <div>
                <p className="text-gray-600 font-bold">Email:</p>
                <p>{email}</p>
              </div>
              <div>
                <p className="text-gray-600 font-bold">Phone Number:</p>
                <p>{phoneNumber}</p>
              </div>
              <div>
                <p className="text-gray-600 font-bold">Address:</p>
                <p>{address}</p>
              </div>
              {profilePicture && (
                <div>
                  <p className="text-gray-600 font-bold">Profile Picture:</p>
                  <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                </div>
              )}
              <div className="md:col-span-2">
            <ActionButton
              label="Edit Profile"
              onClick={() => setIsEditingBasicInfo(true)}
              variant="primary"
              disabled={isSavingBasicInfo}
            />
              </div>
            </div>
          ) : (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {profilePicture && (
                  <p className="mt-2 text-sm text-gray-500">Selected file: {profilePicture.name}</p>
                )}
              </div>
              <div className="col-span-1 md:col-span-2 flex space-x-2">
                <ActionButton
                  label={isSavingBasicInfo ? "Saving..." : "Save"}
                  onClick={handleSaveBasicInfo}
                  variant="primary"
                  disabled={isSavingBasicInfo}
                />
                <ActionButton
                  label="Cancel"
                  onClick={handleCancelBasicInfo}
                  variant="secondary"
                  disabled={isSavingBasicInfo}
                />
              </div>
            </form>
          )}
        </SectionWrapper>

        {/* Section 2: Password Management */}
        <SectionWrapper title="Password Management" className="mt-8">
          {!isEditingPassword ? (
            <ActionButton
              label="Change Password"
              onClick={() => setIsEditingPassword(true)}
              variant="primary"
              disabled={isChangingPassword}
            />
          ) : (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-1 md:col-span-2 flex space-x-2">
                <ActionButton
                  label={isChangingPassword ? "Saving..." : "Save New Password"}
                  onClick={handleChangePassword}
                  variant="primary"
                  disabled={isChangingPassword}
                />
                <ActionButton
                  label="Cancel"
                  onClick={() => setIsEditingPassword(false)}
                  variant="secondary"
                  disabled={isChangingPassword}
                />
              </div>
            </form>
          )}
        </SectionWrapper>

        {/* Section 3: Preferences */}
        <SectionWrapper title="Preferences" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="enableNotifications" className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="enableNotifications"
                  checked={notificationsEnabled}
                  onChange={handleNotificationChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Enable All Notifications</span>
              </label>
            </div>
            <div>
              <label htmlFor="enableBookingReminders" className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="enableBookingReminders"
                  checked={bookingRemindersEnabled}
                  onChange={handleBookingRemindersChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Enable Booking Reminders</span>
              </label>
            </div>
            {/* Additional preferences can be added here */}
          </div>
        </SectionWrapper>

        {/* Section 4: Account Actions */}
        <SectionWrapper title="Account Actions" className="mt-8">
          <div className="flex space-x-4 mt-4">
            <ActionButton
              label={isDeletingAccount ? "Deleting..." : "Delete Account"}
              onClick={handleDeleteAccount}
              variant="danger"
              disabled={isDeletingAccount}
            />
          </div>
        </SectionWrapper>
    </CustomerPortalLayout>
  );
};

export default CustomerProfilePage;
