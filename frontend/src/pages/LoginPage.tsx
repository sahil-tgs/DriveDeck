// src/pages/LoginPage.tsx

import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LoginForm } from '@/components/auth';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const registered = searchParams.get('registered');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {registered && (
            <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-md text-sm">
              Registration successful! Please login with your credentials.
            </div>
          )}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};