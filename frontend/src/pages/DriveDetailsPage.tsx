// src/pages/DriveDetailsPage.tsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDrive, useApplyToDrive, useApplications } from '@/hooks';
import { DriveStatusDisplay, RoleTypeDisplay } from '@/types';

export const DriveDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: drive, isLoading } = useDrive(Number(id));
  const { data: applications } = useApplications();
  const { mutate: applyToDrive, isPending } = useApplyToDrive();

  // Check if user has already applied
  const hasApplied = applications?.some(app => app.drive === Number(id));

  const handleApply = () => {
    if (!user?.is_student) {
      navigate('/login');
      return;
    }

    applyToDrive(
      { drive: Number(id) },
      {
        onSuccess: () => {
          alert('Application submitted successfully!');
        },
        onError: (error: any) => {
          alert(error.response?.data?.message || 'Failed to apply');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading drive details...</div>
      </div>
    );
  }

  if (!drive) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">Drive not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{drive.job_title}</h1>
          <p className="text-xl text-gray-600">{drive.company_name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Status</h3>
            <span className={`px-3 py-1 rounded ${
              drive.status === 'AC' ? 'bg-green-100 text-green-800' :
              drive.status === 'UP' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {DriveStatusDisplay[drive.status]}
            </span>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Role Type</h3>
            <p>{RoleTypeDisplay[drive.role_type]}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Package</h3>
            <p>{drive.package_details || 'Not specified'}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Job Description</h3>
          <p className="whitespace-pre-wrap text-gray-700">{drive.job_description}</p>
        </div>

        {drive.eligibility_criteria && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Eligibility Criteria</h3>
            <p className="whitespace-pre-wrap text-gray-700">{drive.eligibility_criteria}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Application Deadline</h3>
            <p className="text-gray-700">
              {drive.application_deadline ? 
                new Date(drive.application_deadline).toLocaleString() : 
                'Not specified'}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Drive Date</h3>
            <p className="text-gray-700">
              {drive.drive_date ? 
                new Date(drive.drive_date).toLocaleDateString() : 
                'Not specified'}
            </p>
          </div>
        </div>

        {user?.is_student && drive.status === 'AC' && (
          <div className="mt-6">
            {hasApplied ? (
              <button
                disabled
                className="w-full py-3 px-4 bg-gray-300 text-gray-700 rounded cursor-not-allowed"
              >
                Already Applied
              </button>
            ) : (
              <button
                onClick={handleApply}
                disabled={isPending}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isPending ? 'Applying...' : 'Apply Now'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};