import React from 'react'
import { useSession } from '../context/useSession.js';
import { logout as logoutAPI } from '../service/authapi.js';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { userData, logout } = useSession();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logoutAPI();
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Logout locally even if API call fails
      logout();
      navigate('/login');
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-700 mb-2">
                Welcome, {userData?.username || 'User'}!
              </h1>
              <p className="text-gray-600">
                Your account is protected with two-factor authentication
              </p>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                loggingOut 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Username:</span>
                <span className="ml-2 font-medium">{userData?.username}</span>
              </div>
              <div>
                <span className="text-gray-600">User ID:</span>
                <span className="ml-2 font-mono text-sm">{userData?.id}</span>
              </div>
              <div>
                <span className="text-gray-600">2FA Status:</span>
                <span className={`ml-2 font-medium ${
                  userData?.isMfaActive ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {userData?.isMfaActive ? 'Active' : 'Setup Required'}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Last Login:</span>
                <span className="ml-2 text-sm">
                  {userData?.lastLogin 
                    ? new Date(userData.lastLogin).toLocaleString()
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Status</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Secure login with password</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  userData?.isMfaActive ? 'bg-green-500' : 'bg-orange-500'
                }`}></div>
                <span className="text-gray-700">
                  Two-factor authentication {userData?.isMfaActive ? 'enabled' : 'pending'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Session-based authentication</span>
              </div>
            </div>
            
            {!userData?.isMfaActive && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 text-sm">
                  <strong>Action Required:</strong> Complete your 2FA setup to fully secure your account.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>2FA Authentication App - Securing your digital identity</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
