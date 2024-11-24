import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegistrationPage from './components/Register'; 
import LoginPage from './components/Login'; 
import UserDashboard from './components/UserDashboard'; // User Dashboard
import AdminDashboard from './components/AdminDashboard'; // Admin Dashboard
import PrivateRoute from './components/PrivateRoute'; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 1. Set /register as the default route */}
          <Route path="/" element={<Navigate to="/register" />} />

          {/* 2. Registration Route for User/Admin */}
          <Route path="/register" element={<RegistrationPage />} />

          {/* 3. Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* 4. Protected Routes */}
          <Route
            path="/user-dashboard"
            element={
              <PrivateRoute role="user">
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
