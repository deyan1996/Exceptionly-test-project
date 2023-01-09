import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const GuestProtect: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return <>{children}</>;
};

export default GuestProtect;
