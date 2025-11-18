import React from 'react';
import { OrganizationHeader } from './OrganizationHeader';

const UserPortalLayout = ({ children }) => {
  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
        <OrganizationHeader/>
        <main className="py-8 px-4 pb-16">
          <div className="w-full">
            {children}
          </div>
        </main>
        <footer className="bg-gray-700 text-yellow-400 text-center py-4 text-sm fixed bottom-0 left-0 w-full">
            <strong>© {new Date().getFullYear()} Musibau AutoWorks. All rights reserved.</strong>
        </footer>
      </div>
  );
};

export default UserPortalLayout;
