import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/apiService';

const EditProfilePage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getUserProfile();
        console.log('getUserProfile Response:', response); // Debug: Kiểm tra phản hồi
        const fetchedUser = response.usersDTO || response.user || response.data?.user;
        if (!fetchedUser) throw new Error('User data not found');

        setUser(fetchedUser);
        setEmail(fetchedUser.email || '');
        setError(null);
      } catch (err) {
        console.error('Fetch Error:', err); // Debug: Xem chi tiết lỗi
        setError(err.message || 'Failed to fetch user profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDeleteProfile = async () => {
    if (!window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) return;

    try {
      setIsLoading(true);
      if (!user?.userId) throw new Error('User ID not available');

      await ApiService.deleteUser(user.userId);
      await ApiService.logout(); 
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Delete Error:', err); // Debug: Xem chi tiết lỗi
      setError(err.message || 'Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      if (!user?.userId) throw new Error('User ID is not available.');

      // Validate password
      if (password && password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }
      if (password && password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }

      // Prepare updated data
      const updatedData = {};
      if (email && email !== user.email) updatedData.email = email;
      if (password) updatedData.password = password;

      if (Object.keys(updatedData).length === 0) {
        throw new Error('No changes detected to update.');
      }

      await ApiService.updateUserProfile(user.userId, updatedData);
      alert('Profile updated successfully!');
      setError(null);
      setPassword(''); // Clear password after update
      setConfirmPassword(''); // Clear confirm password
      setUser({ ...user, ...updatedData }); // Update local user state
    } catch (err) {
      console.error('Update Error:', err); // Debug: Log error details
      setError(err.message || 'Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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

          {user ? (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium text-gray-500">New Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="col-span-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium text-gray-500">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="col-span-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => navigate('/profile')}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProfile}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Update
                </button>
                <button
                  onClick={handleDeleteProfile}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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