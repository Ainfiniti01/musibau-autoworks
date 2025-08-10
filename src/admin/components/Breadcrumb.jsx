import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    return pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      const displayName = name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim();

      return (
        <span key={displayName} className="flex items-center">
          {isLast ? (
            <span className="text-gray-800 font-semibold">
              {displayName}
            </span>
          ) : (
            <Link to={routeTo} className="text-gray-600 hover:text-gray-800">
              {displayName}
            </Link>
          )}
          {!isLast && <span className="mx-2 text-gray-400">/</span>}
        </span>
      );
    });
  };

  return (
    <nav className="text-sm flex">
      {getBreadcrumbs()}
    </nav>
  );
};

export default Breadcrumb;
