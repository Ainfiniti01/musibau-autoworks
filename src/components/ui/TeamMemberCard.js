import React from 'react';

const TeamMemberCard = ({ name, role, email }) => {
  return (
    <div className="text-gray-700 flex justify-between items-center p-2 border-b border-gray-200">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
      {email && <p className="text-sm text-gray-500">{email}</p>}
    </div>
  );
};

export default TeamMemberCard;
