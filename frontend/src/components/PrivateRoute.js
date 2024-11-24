import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; 
const PrivateRoute = ({ children, role }) => {
  const { user } = useAuthContext(); 

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user role doesn't match the required role, redirect to the appropriate dashboard or login
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />;
  }

  return children; 
};

export default PrivateRoute;
