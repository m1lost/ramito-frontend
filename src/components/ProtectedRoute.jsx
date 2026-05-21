import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let userRoles = [];

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    userRoles = decoded.roles?.map((r) => r.toLowerCase()) || [];

    console.log('userRoles:', userRoles);
  } catch (error) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0) {
    const allowed = allowedRoles.map((r) => r.toLowerCase());

    const hasAccess = allowed.some((role) => userRoles.includes(role));

    if (!hasAccess) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
