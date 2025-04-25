// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './components/layout';
import { ProtectedRoute } from './components/auth';
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  DrivesPage,
  DriveDetailsPage,
  ApplicationsPage,
  ProfilePage,
  CompaniesPage,
  NotFoundPage,
} from './pages';

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route element={<MainLayout />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/drives" element={<DrivesPage />} />
                <Route path="/drives/:id" element={<DriveDetailsPage />} />
                
                {/* Student Only Routes */}
                <Route element={<ProtectedRoute requiredRole="student" />}>
                  <Route path="/applications" element={<ApplicationsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
                
                {/* TNP Officer Only Routes */}
                <Route element={<ProtectedRoute requiredRole="tnp_officer" />}>
                  <Route path="/companies" element={<CompaniesPage />} />
                </Route>
              </Route>
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;