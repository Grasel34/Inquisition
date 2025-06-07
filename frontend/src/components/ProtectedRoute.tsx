import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PerfilResponse } from '../types/api';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

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
        if (res.ok) {
          await res.json() as PerfilResponse;
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
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
