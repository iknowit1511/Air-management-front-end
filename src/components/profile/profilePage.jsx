import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/apiService';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ApiService.getUserProfile();
      const userPlusBookings = await ApiService.getUserBookings(response.usersDTO.userId);
      setUser(userPlusBookings.usersDTO);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch user profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleLogout = () => {
    try {
      ApiService.logout();
      navigate('/home', { replace: true });
    } catch (error) {
      setError('Failed to logout');
    }
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="profile-page min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            {error && (
              <p className="error-message mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
                {error}
              </p>
            )}

            {user && (
              <div className="profile-header flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Welcome, {user.username}</h2>
                <div className="profile-actions flex space-x-4">
                  <button
                    className="edit-profile-button px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    onClick={handleEditProfile}
                    disabled={isLoading}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="logout-button px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {user && (
              <div className="profile-details bg-white shadow rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">My Profile Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-gray-600">
                    <strong>Email:</strong> {user.email || 'Not provided'}
                  </p>
                </div>
              </div>
            )}

            <div className="bookings-section bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">My Booking History</h3>
              <div className="booking-list space-y-6">
                {user && user.bookings?.length > 0 ? (
                  user.bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="booking-item border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-gray-600">
                            <strong>Booking Code:</strong> {bookings.bookingConfirmationCode || 'N/A'}
                          </p>
                          <p className="text-gray-600">
                            <strong>Check-in Date:</strong> {bookings.checkInDate || 'N/A'}
                          </p>
                          <p className="text-gray-600">
                            <strong>Check-out Date:</strong> {bookings.checkOutDate || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            <strong>Total Guests:</strong> {bookings.totalNumOfGuest || 'N/A'}
                          </p>
                          <p className="text-gray-600">
                            <strong>Room Type:</strong> {bookings.room?.roomType || 'N/A'}
                          </p>
                        </div>
                      </div>
                      {booking.room?.roomPhotoUrl && (
                        <img
                          src={bookings.room.roomPhotoUrl}
                          alt="Room"
                          className="room-photo w-full max-w-xs rounded-md shadow-sm mt-4"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No bookings found.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;