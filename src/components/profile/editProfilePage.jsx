import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/apiService';

const EditProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const { user } = await ApiService.getUserProfile();
      setUser(user);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch user profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleDeleteProfile = async () => {
    if (!window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      setIsLoading(true);
      await ApiService.deleteUser(user.id);
      navigate('/signup', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  };

  const fieldMap = {
    name: 'Name',
    email: 'Email',
    phoneNumber: 'Phone Number'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
              <p>{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : user ? (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  {Object.entries(fieldMap).map(([key, label]) => (
                    <div key={key} className="grid grid-cols-3 gap-4 items-center">
                      <label className="text-sm font-medium text-gray-500">{label}</label>
                      <p className="col-span-2 mt-1 text-sm text-gray-900">{user[key] || 'Not provided'}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => navigate('/profile')}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProfile}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  Delete Account
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No user data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;