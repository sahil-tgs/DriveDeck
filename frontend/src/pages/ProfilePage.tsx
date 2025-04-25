// src/pages/ProfilePage.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile, useCreateProfile, useUpdateProfile } from '@/hooks';
import { StudentProfile } from '@/types';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const { mutate: createProfile, isPending: isCreating } = useCreateProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  
  const [formData, setFormData] = useState<Partial<StudentProfile>>({
    enrollment_number: '',
    branch: '',
    cgpa: null,
    phone_number: '',
    skills: '',
    projects: '',
    resume_text: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profile) {
      updateProfile(formData, {
        onSuccess: () => {
          alert('Profile updated successfully!');
        },
        onError: () => {
          alert('Failed to update profile');
        },
      });
    } else {
      createProfile(formData, {
        onSuccess: () => {
          alert('Profile created successfully!');
        },
        onError: () => {
          alert('Failed to create profile');
        },
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cgpa' ? (value ? parseFloat(value) : null) : value,
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Student Profile</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enrollment Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="enrollment_number"
              value={formData.enrollment_number}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CGPA
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              name="cgpa"
              value={formData.cgpa || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter skills (comma-separated or one per line)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Projects
            </label>
            <textarea
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Describe your academic or personal projects"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resume Text
            </label>
            <textarea
              name="resume_text"
              value={formData.resume_text}
              onChange={handleChange}
              rows={6}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Paste your resume text or summarize key qualifications"
            />
          </div>
          
          <button
            type="submit"
            disabled={isCreating || isUpdating}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isCreating || isUpdating ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};