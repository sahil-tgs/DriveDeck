// src/pages/ApplicationsPage.tsx

import React from 'react';
import { useApplications, useWithdrawApplication } from '@/hooks';
import { ApplicationStatusDisplay, ApplicationStatusColor } from '@/types';

export const ApplicationsPage: React.FC = () => {
  const { data: applications, isLoading } = useApplications();
  const { mutate: withdrawApplication } = useWithdrawApplication();

  const handleWithdraw = (id: number) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      withdrawApplication(id);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Applications</h1>
      
      {applications && applications.length > 0 ? (
        <div className="space-y-6">
          {applications.map(application => (
            <div key={application.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{application.drive_title}</h2>
                  <p className="text-gray-600">{application.company_name}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Applied on: {new Date(application.applied_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${ApplicationStatusColor[application.status]}`}>
                    {ApplicationStatusDisplay[application.status]}
                  </span>
                  {application.status === 'AP' && (
                    <button
                      onClick={() => handleWithdraw(application.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
              
              {application.tnp_comments && (
                <div className="mt-4 bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold mb-2">TNP Comments</h3>
                  <p className="text-gray-700">{application.tnp_comments}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>You haven't applied to any drives yet.</p>
          <a href="/drives" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Browse available drives
          </a>
        </div>
      )}
    </div>
  );
};