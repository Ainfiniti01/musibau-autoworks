import React from 'react';
import UserPortalLayout from '../../components/UserPortalLayout';
import { OrganizationHeader } from '../../components/OrganizationHeader';
import SectionWrapper from '../../components/ui/SectionWrapper';
import ActionButton from '../../components/ui/ActionButton';

const OrganizationProfilePage = () => {
  return (
    <UserPortalLayout className="max-w-7xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-primary mb-6">Organization Profile</h1>
        
        <SectionWrapper title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-lightGray">Company Name</label>
              <p className="mt-1 text-mediumGray">[Your Company Name]</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-lightGray">Contact Person</label>
              <p className="mt-1 text-mediumGray">[Contact Person Name]</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-lightGray">Business Email</label>
              <p className="mt-1 text-mediumGray">[company@example.com]</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-lightGray">Phone</label>
              <p className="mt-1 text-mediumGray">[+123 456 7890]</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-lightGray">Address</label>
              <p className="mt-1 text-mediumGray">[Company Address]</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-lightGray">Tax ID</label>
              <p className="mt-1 text-mediumGray">[Tax ID Number]</p>
            </div>
          </div>
          <ActionButton label="Edit Basic Info" variant="primary" className="mt-6 bg-primary hover:bg-primary-dark text-dark" />
        </SectionWrapper>

        <SectionWrapper title="Password Management" className="mt-8">
          <p className="text-mediumGray">Change your organization's account password.</p>
          <ActionButton label="Change Password" variant="primary" className="mt-4 bg-primary hover:bg-primary-dark text-dark" />
        </SectionWrapper>

        <SectionWrapper title="Preferences" className="mt-8">
          <p className="text-mediumGray">Manage notification settings and multiple contact points for your organization.</p>
          <div className="mt-4 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-primary" defaultChecked />
              <span className="ml-2 text-lightGray">Email Notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-primary" />
              <span className="ml-2 text-lightGray">SMS Notifications</span>
            </label>
            <ActionButton label="Manage Contact Points" variant="secondary" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white" />
          </div>
        </SectionWrapper>

        <SectionWrapper title="Team Management" className="mt-8">
          <p className="text-mediumGray">Add, edit, or remove team members and manage their roles within the organization.</p>
          <div className="mt-4 space-y-2">
            <ul className="list-disc list-inside text-mediumGray">
              <li>John Doe (Admin) - <button className="text-red-500 hover:underline">Remove</button></li>
              <li>Jane Smith (Member) - <button className="text-red-500 hover:underline">Remove</button></li>
            </ul>
            <ActionButton label="Add New Team Member" variant="primary" className="mt-4 bg-primary hover:bg-primary-dark text-dark" />
          </div>
        </SectionWrapper>
      
      <footer className="bg-dark text-primary text-center py-4 text-sm fixed bottom-0 left-0 w-full">
         <strong>© {new Date().getFullYear()} Musibau AutoWorks. All rights reserved.</strong>
      </footer>
    </UserPortalLayout>
  );
};

export default OrganizationProfilePage;
