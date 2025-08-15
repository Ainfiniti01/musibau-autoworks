import React from 'react';
import { Helmet } from 'react-helmet-async';

const OrganizationProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Helmet>
        <title>Musibau AutoWorks - Organization Profile</title>
        <meta name="description" content="Manage your organization profile at Musibau AutoWorks." />
      </Helmet>
      <h1 className="text-3xl font-bold text-[#004040] mb-6">Organization Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-semibold text-[#ECBE07] mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <p className="mt-1 text-gray-900">[Your Company Name]</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person</label>
              <p className="mt-1 text-gray-900">[Contact Person Name]</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Email</label>
              <p className="mt-1 text-gray-900">[company@example.com]</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <p className="mt-1 text-gray-900">[+123 456 7890]</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <p className="mt-1 text-gray-900">[Company Address]</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tax ID</label>
              <p className="mt-1 text-gray-900">[Tax ID Number]</p>
            </div>
          </div>
          <button className="mt-6 bg-[#ECBE07] text-[#004040] py-2 px-4 rounded-md hover:bg-[#d4a806]">Edit Basic Info</button>
        </div>

        {/* Password Management */}
        <div>
          <h2 className="text-xl font-semibold text-[#ECBE07] mb-4">Password Management</h2>
          <p className="text-gray-700">Change your organization's account password.</p>
          <button className="mt-4 bg-[#004040] text-white py-2 px-4 rounded-md hover:bg-[#002020]">Change Password</button>
        </div>

        {/* Preferences */}
        <div>
          <h2 className="text-xl font-semibold text-[#ECBE07] mb-4">Preferences</h2>
          <p className="text-gray-700">Manage notification settings and multiple contact points for your organization.</p>
          <div className="mt-4 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-[#ECBE07]" defaultChecked />
              <span className="ml-2 text-gray-900">Email Notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-[#ECBE07]" />
              <span className="ml-2 text-gray-900">SMS Notifications</span>
            </label>
            <button className="mt-4 bg-[#ECBE07] text-[#004040] py-2 px-4 rounded-md hover:bg-[#d4a806]">Manage Contact Points</button>
          </div>
        </div>

        {/* Team Management */}
        <div>
          <h2 className="text-xl font-semibold text-[#ECBE07] mb-4">Team Management</h2>
          <p className="text-gray-700">Add, edit, or remove team members and manage their roles within the organization.</p>
          <div className="mt-4 space-y-2">
            <ul className="list-disc list-inside text-gray-600">
              <li>John Doe (Admin) - <button className="text-red-500 hover:underline">Remove</button></li>
              <li>Jane Smith (Member) - <button className="text-red-500 hover:underline">Remove</button></li>
            </ul>
            <button className="mt-4 bg-[#004040] text-white py-2 px-4 rounded-md hover:bg-[#002020]">Add New Team Member</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfilePage;
