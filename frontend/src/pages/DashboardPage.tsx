// src/pages/DashboardPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDrives, useApplications } from '@/hooks';
import { DriveStatusDisplay, ApplicationStatusDisplay } from '@/types';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { data: drives, isLoading: drivesLoading } = useDrives();
  const { data: applications, isLoading: applicationsLoading } = useApplications();

  // Filter active drives
  const activeDrives = drives?.filter(drive => drive.status === 'AC') || [];
  
  // Get recent applications for students
  const recentApplications = applications?.slice(0, 5) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Welcome, {user?.first_name || user?.username}!
      </h1>

      {user?.is_student && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Active Drives Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Active Drives</h2>
            {drivesLoading ? (
              <p>Loading drives...</p>
            ) : activeDrives.length > 0 ? (
              <div className="space-y-4">
                {activeDrives.map(drive => (
                  <div key={drive.id} className="border-b pb-4">
                    <Link 
                      to={`/drives/${drive.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {drive.job_title}
                    </Link>
                    <p className="text-sm text-gray-600">{drive.company_name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Deadline: {drive.application_deadline ? 
                        new Date(drive.application_deadline).toLocaleDateString() : 
                        'Not specified'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No active drives at the moment.</p>
            )}
            <Link 
              to="/drives" 
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              View all drives →
            </Link>
          </div>

          {/* Recent Applications Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
            {applicationsLoading ? (
              <p>Loading applications...</p>
            ) : recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map(application => (
                  <div key={application.id} className="border-b pb-4">
                    <p className="font-medium">{application.drive_title}</p>
                    <p className="text-sm text-gray-600">{application.company_name}</p>
                    <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${ApplicationStatusColor[application.status]}`}>
                      {ApplicationStatusDisplay[application.status]}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No applications yet.</p>
            )}
            <Link 
              to="/applications" 
              className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
              View all applications →
            </Link>
          </div>
        </div>
      )}

      {user?.is_tnp_officer && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Statistics Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Total Drives</h3>
            <p className="text-3xl font-bold text-blue-600">
              {drives?.length || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Active Drives</h3>
            <p className="text-3xl font-bold text-green-600">
              {activeDrives.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
            <p className="text-3xl font-bold text-purple-600">
              {applications?.length || 0}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};