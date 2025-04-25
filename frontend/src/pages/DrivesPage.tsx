// src/pages/DrivesPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDrives } from '@/hooks';
import { DriveStatusDisplay, RoleTypeDisplay, DriveStatus, RoleType } from '@/types';

export const DrivesPage: React.FC = () => {
  const { data: drives, isLoading } = useDrives();
  const [statusFilter, setStatusFilter] = useState<DriveStatus | 'ALL'>('ALL');
  const [roleFilter, setRoleFilter] = useState<RoleType | 'ALL'>('ALL');

  const filteredDrives = drives?.filter(drive => {
    if (statusFilter !== 'ALL' && drive.status !== statusFilter) return false;
    if (roleFilter !== 'ALL' && drive.role_type !== roleFilter) return false;
    return true;
  }) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading drives...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Placement Drives</h1>
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DriveStatus | 'ALL')}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="ALL">All Status</option>
            {Object.entries(DriveStatusDisplay).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role Type
          </label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as RoleType | 'ALL')}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="ALL">All Types</option>
            {Object.entries(RoleTypeDisplay).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Drives List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrives.map(drive => (
          <div key={drive.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{drive.job_title}</h2>
                <p className="text-gray-600">{drive.company_name}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded ${
                drive.status === 'AC' ? 'bg-green-100 text-green-800' :
                drive.status === 'UP' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {DriveStatusDisplay[drive.status]}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {RoleTypeDisplay[drive.role_type]}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Package:</strong> {drive.package_details || 'Not specified'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Deadline:</strong> {drive.application_deadline ? 
                  new Date(drive.application_deadline).toLocaleDateString() : 
                  'Not specified'}
              </p>
            </div>
            
            <Link
              to={`/drives/${drive.id}`}
              className="inline-block w-full text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredDrives.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No drives match your filters.
        </div>
      )}
    </div>
  );
};