import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionWrapper from '../../components/ui/SectionWrapper';
import ActionButton from '../../components/ui/ActionButton';
import UserPortalLayout from '../../components/UserPortalLayout';

const OrganizationDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <UserPortalLayout className="max-w-7xl mx-auto py-10 px-6">
      <>
        <h1 className="text-3xl font-bold text-primary mb-6">Organization Dashboard</h1>
        <div >
          <SectionWrapper title="Company Overview" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <p className="text-mediumGray">View and manage your company's information, team members, and overall service summaries.</p>
            <div className="mt-4 text-mediumGray">
              <p><strong>Company Name:</strong> [Your Company Name]</p>
              <p><strong>Contact Person:</strong> [Contact Person Name]</p>
              <p><strong>Total Bookings:</strong> 150</p>
              <p><strong>Active Services:</strong> 12</p>
            </div>
          </SectionWrapper>

          <SectionWrapper title="Bookings & Services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mt-9">
            <p className="text-mediumGray">Access company-wide booking and service history. Filter by team member or department.</p>
            <ul className="mt-4 space-y-2 text-mediumGray">
              <li>Service A - Completed (Team Member X)</li>
              <li>Booking B - Pending (Department Y)</li>
              <li>Service C - In Progress (Team Member Z)</li>
            </ul>
            <ActionButton label="View All" variant="primary" onClick={() => navigate('/organization/booking-history')} className="mt-4 bg-primary hover:bg-primary-dark text-dark" />
          </SectionWrapper>

          <SectionWrapper title="Notifications" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mt-9">
            <p className="text-mediumGray">Receive company-wide alerts and notifications for multiple users.</p>
            <ul className="mt-4 space-y-2 text-mediumGray">
              <li>New service update available for all team members.</li>
              <li>Upcoming maintenance scheduled for fleet vehicles.</li>
              <li>Invoice #12345 is due.</li>
            </ul>
          </SectionWrapper>

          <SectionWrapper title="User Actions" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mt-9">
            <p className="text-mediumGray">Manage your company profile and team accounts/roles.</p>
            <div className="mt-4 space-y-2">
              <ActionButton label="Manage Company Profile" variant="primary" onClick={() => navigate('/organization/profile')} className="w-full bg-primary hover:bg-primary-dark text-dark" />
              <ActionButton label="Manage Team Accounts" variant="secondary" onClick={() => navigate('/organization/team')} className="w-full bg-primary hover:bg-primary-dark text-dark" />
            </div>
          </SectionWrapper>
        </div>
      </>
    </UserPortalLayout>
  );
};

export default OrganizationDashboardPage;
