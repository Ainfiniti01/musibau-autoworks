import React from 'react';


const UserTypeBadge = ({ userType }) => {
  const badgeClassName = userType === 'Active'
    ? 'bg-green-100 text-green-800'
    : 'bg-yellow-100 text-gray-800';

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClassName}`}>
      {userType}
    </span>
  );
};

export default UserTypeBadge;