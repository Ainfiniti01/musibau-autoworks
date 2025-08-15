import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/ui/PageLayout';
import SectionWrapper from '../../components/ui/SectionWrapper';
import ActionButton from '../../components/ui/ActionButton';

const CustomerProfilePage = () => {
  // State for Basic Info
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [address, setAddress] = useState('123 Main St, Anytown, USA');
  const [profilePicture, setProfilePicture] = useState(null); // For file upload
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);

  // State for Password Management
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // State for Preferences
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // Handlers for Basic Info
  const handleEditBasicInfo = () => {
    setIsEditingBasicInfo(true);
  };

  const handleSaveBasicInfo = () => {
    // TODO: Implement API call to save basic info
    console.log('Saving basic info:', { fullName, email, phoneNumber, address });
    // Resetting form to current saved values before exiting edit mode
    // In a real app, you'd fetch current values or have them in a separate state
    setIsEditingBasicInfo(false);
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
  const handleChangePassword = () => {
    // TODO: Implement password change logic
    if (newPassword !== confirmNewPassword) {
      console.error('New password and confirm new password do not match.');
      // Optionally, display an error message to the user
      return;
    }
    console.log('Changing password:', { oldPassword, newPassword, confirmNewPassword });
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsEditingPassword(false);
  };

  // Handlers for Preferences
  const handleNotificationChange = (event) => {
    setNotificationsEnabled(event.target.checked);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  // Handler for Logout
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logging out...');
  };

  const navigate = useNavigate();

  return (
    <PageLayout title="Musibau AutoWorks - Customer Profile">
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-[#004040]">Your Profile</h1>
          <ActionButton
            label="Logout"
            onClick={handleLogout}
            variant="danger"
          />
        </div>
        <p className="text-lg text-gray-700 mb-8">Manage your personal information and preferences.</p>

        {/* Section 1: Basic Info */}
        <SectionWrapper title="Basic Information">
          {!isEditingBasicInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="font-medium">Full Name:</p>
                <p>{fullName}</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p>{email}</p>
              </div>
              <div>
                <p className="font-medium">Phone Number:</p>
                <p>{phoneNumber}</p>
              </div>
              <div>
                <p className="font-medium">Address:</p>
                <p>{address}</p>
              </div>
              {profilePicture && (
                <div>
                  <p className="font-medium">Profile Picture:</p>
                  <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                </div>
              )}
              <div className="md:col-span-2">
                <ActionButton
                  label="Edit Basic Info"
                  onClick={handleEditBasicInfo}
                  variant="secondary"
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
                  label="Save"
                  onClick={handleSaveBasicInfo}
                  variant="primary"
                />
                <ActionButton
                  label="Cancel"
                  onClick={handleCancelBasicInfo}
                  variant="secondary"
                />
              </div>
            </form>
          )}
        </SectionWrapper>

        {/* Section 2: Password Management */}
        <SectionWrapper title="Password Management" className="mt-8">
          {!isEditingPassword ? (
            <button
              onClick={() => setIsEditingPassword(true)}
              className="bg-green-teal text-white px-4 py-2 rounded hover:bg-green-teal-dark"
            >
              Change Password
            </button>
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
                  label="Save New Password"
                  onClick={handleChangePassword}
                  variant="primary"
                />
                <ActionButton
                  label="Cancel"
                  onClick={() => setIsEditingPassword(false)}
                  variant="secondary"
                />
              </div>
            </form>
          )}
        </SectionWrapper>

        {/* Section 3: Preferences */}
        <SectionWrapper title="Preferences" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="notifications" className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={notificationsEnabled}
                  onChange={handleNotificationChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Enable Notifications</span>
              </label>
            </div>
            {/* <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
              <select
                id="theme"
                value={theme}
                onChange={handleThemeChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div> */}
          </div>
        </SectionWrapper>

        {/* Section 4: Account Actions */}
        <SectionWrapper title="Account Actions" className="mt-8">
          <div className="flex space-x-4 mt-4">
            <ActionButton
              label="Delete Account"
              onClick={() => console.log('Delete Account')} // Placeholder for delete account logic
              variant="danger"
            />
          </div>
        </SectionWrapper>
      </div>
    </PageLayout>
  );
};

export default CustomerProfilePage;
