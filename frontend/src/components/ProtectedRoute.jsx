import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const ProtectedRoute = ({ element }) => {
  const auth = getAuth();
  const user = auth.currentUser; // Verifica se o usuário está autenticado
  
  if (!user) {
    return <Navigate to="/login" replace />; // Redireciona para login se não estiver autenticado
  }

  return element; // Se o usuário estiver autenticado, renderiza o componente protegido
};

export default ProtectedRoute;
