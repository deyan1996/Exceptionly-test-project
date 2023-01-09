import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const AuthProtect: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};

export default AuthProtect;
