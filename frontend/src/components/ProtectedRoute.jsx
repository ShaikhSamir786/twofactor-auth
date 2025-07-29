import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '../context/useSession.js';

function ProtectedRoute() {
  const { isLoggedIn, loading } = useSession();
  
  console.log("ProtectedRoute - isLoggedIn:", isLoggedIn, "loading:", loading);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute
