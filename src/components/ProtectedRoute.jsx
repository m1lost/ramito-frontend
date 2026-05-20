import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  if (!token) {
    return <Navigate to="/home" replace />;
  }

  if (allowedRoles.length > 0) {
    const userRoles = user?.Roles?.map((r) => r.name.toLowerCase()) || [];

    const allowed = allowedRoles.map((r) => r.toLowerCase());

    const hasAccess = allowed.some((role) => userRoles.includes(role));

    if (!hasAccess) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
