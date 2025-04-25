// src/components/layout/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            DriveDeck
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/drives" className="text-gray-600 hover:text-blue-600">
                Drives
              </Link>
              {user?.is_student && (
                <>
                  <Link to="/applications" className="text-gray-600 hover:text-blue-600">
                    Applications
                  </Link>
                  <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                    Profile
                  </Link>
                </>
              )}
              {user?.is_tnp_officer && (
                <>
                  <Link to="/companies" className="text-gray-600 hover:text-blue-600">
                    Companies
                  </Link>
                  <Link to="/admin/drives" className="text-gray-600 hover:text-blue-600">
                    Manage Drives
                  </Link>
                </>
              )}
              <span className="text-gray-600">
                {user?.first_name || user?.username}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};