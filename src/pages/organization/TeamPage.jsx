import React, { useState } from 'react';
import UserPortalLayout from '../../components/UserPortalLayout';
import { OrganizationHeader } from '../../components/OrganizationHeader';
import { Card } from '../../components/Card';

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      img: 'broken', // Using 'broken' to trigger placeholder in Card component
      role: 'Technician',
      bio: 'John is an experienced technician with 10 years of experience.',
      rating: 4.5,
      availability: 'Available',
      socials: ['twitter', 'linkedin']
    },
    {
      id: 2,
      name: 'Jane Smith',
      img: 'broken', // Using 'broken' to trigger placeholder in Card component
      role: 'Service Advisor',
      bio: 'Jane is a friendly service advisor with 5 years of experience.',
      rating: 4.8,
      availability: 'Busy',
      socials: ['facebook', 'instagram']
    },
  ]);

  const [filters, setFilters] = useState({
    role: '',
    availability: '',
  });

  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSocialClick = (social) => {
    alert(`Clicked on ${social} for`);
  };

  const handleToggleAvailability = (memberId, newAvailability) => {
    setTeamMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === memberId ? { ...member, availability: newAvailability } : member
      )
    );
  };

  const handleAssignTaskClick = (member) => {
    setSelectedTeamMember(member);
    setShowAssignTaskModal(true);
  };

  const handleCloseAssignTaskModal = () => {
    setShowAssignTaskModal(false);
    setSelectedTeamMember(null);
  };

  const handleAssignTaskSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend
    alert(`Assigning task "${e.target.taskName.value}" to ${selectedTeamMember.name}`);
    handleCloseAssignTaskModal();
  };

  const filteredTeamMembers = teamMembers.filter(member => {
    const roleMatch = filters.role === '' || member.role === filters.role;
    const availabilityMatch = filters.availability === '' || member.availability === filters.availability;
    return roleMatch && availabilityMatch;
  });

  return (
    <UserPortalLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-primary">Team Management</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-lightGray">
          <div className="flex items-center">
            <label htmlFor="role" className="mr-2 font-medium text-lightGray">Role:</label>
            <select
              id="role"
              name="role"
              value={filters.role}
              onChange={handleFilterChange}
              className="border border-gray-700 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary sm:text-sm bg-dark text-lightGray"
            >
              <option value="">All</option>
              <option value="Technician">Technician</option>
              <option value="Service Advisor">Service Advisor</option>
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="availability" className="mr-2 font-medium text-lightGray">Availability:</label>
            <select
              id="availability"
              name="availability"
              value={filters.availability}
              onChange={handleFilterChange}
              className="border border-gray-700 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary sm:text-sm bg-dark text-lightGray"
            >
              <option value="">All</option>
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
            </select>
          </div>
        </div>

        {/* Team Member Cards/Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredTeamMembers.map((member) => (
            <div key={member.id}>
              <Card
                name={member.name}
                img={member.img}
                role={member.role}
                bio={member.bio}
                socials={member.socials}
                onSocialClick={handleSocialClick}
                availability={member.availability}
                onToggleAvailability={(newAvailability) => handleToggleAvailability(member.id, newAvailability)}
                onAssignTaskClick={() => handleAssignTaskClick(member)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Assign Task Modal */}
      {showAssignTaskModal && selectedTeamMember && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-primary">Assign Task to {selectedTeamMember.name}</h2>
            <form onSubmit={handleAssignTaskSubmit}>
              <div className="mb-4">
                <label htmlFor="taskName" className="block text-gray-700 text-sm font-bold mb-2">
                  Task Name:
                </label>
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="taskDescription" className="block text-gray-700 text-sm font-bold mb-2">
                  Description:
                </label>
                <textarea
                  id="taskDescription"
                  name="taskDescription"
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseAssignTaskModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-dark text-primary text-center py-4 text-sm fixed bottom-0 left-0 w-full">
        <strong>© {new Date().getFullYear()} Musibau AutoWorks. All rights reserved.</strong>
      </footer>
    </UserPortalLayout>
  );
};

export default TeamPage;
