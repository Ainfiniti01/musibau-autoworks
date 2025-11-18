import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Header */}
      <header className="p-4 text-center border-b shadow-sm bg-white">
        <h1 className="text-xl font-semibold text-primary">Musibau Autoworks</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 animate-fadeIn opacity-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 p-4 border-t">
        © {new Date().getFullYear()} Musibau Autoworks. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;
