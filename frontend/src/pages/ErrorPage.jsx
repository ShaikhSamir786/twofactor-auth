import React from 'react'
import { useRouteError, Link } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error?.statusText || error?.message || "The page you're looking for doesn't exist."}
          </p>
        </div>
        
        <div className="space-y-3">
          <Link 
            to="/" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Go Home
          </Link>
          <br />
          <Link 
            to="/login" 
            className="inline-block text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
