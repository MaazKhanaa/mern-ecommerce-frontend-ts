import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthGuard: React.FC = () => {
  const auth = localStorage.getItem('user');
  
  // Check if user is authenticated
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};
