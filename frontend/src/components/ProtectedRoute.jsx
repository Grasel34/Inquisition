import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthorized(false);
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuthorized(res.ok);
      } catch {
        setAuthorized(false);
      }
    };

    verify();
  }, []);

  if (authorized === null) return null;

  return authorized ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
