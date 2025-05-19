import React, { useState, useEffect, useCallback } from 'react';
import ApiService from '../../service/apiService';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data for each entity
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ApiService.getAllUsers();
      const allUsers = response.data?.users || response.userDTO || [];
      setUsers(allUsers);
      setError(allUsers.length > 0 ? null : 'No users found');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ApiService.getAllBookings();
      setBookings(response.data?.bookings || response.bookings || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFlights = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ApiService.getAllFlights();
      setFlights(response.data?.flights || response.flights || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch flights');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data when tab changes
  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    else if (activeTab === 'bookings') fetchBookings();
    else if (activeTab === 'flights') fetchFlights();
  }, [activeTab, fetchUsers, fetchBookings, fetchFlights]);

  // Handle delete actions
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      setIsLoading(true);
      await ApiService.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      setIsLoading(true);
      await ApiService.deleteBooking(bookingId);
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFlight = async (flightId) => {
    if (!window.confirm('Are you sure you want to delete this flight?')) return;
    try {
      setIsLoading(true);
      await ApiService.deleteFlight(flightId);
      setFlights(flights.filter((flight) => flight.id !== flightId));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete flight');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {['users', 'bookings', 'flights'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                  disabled={isLoading}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && !isLoading && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Users</h3>
            {users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((users) => (
                      <tr key={users.userId}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{users.username || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{users.email || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteUser(users.userId)}
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                            disabled={isLoading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No users found.</p>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && !isLoading && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Bookings</h3>
            {bookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.bookingConfirmationCode || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.checkInDate || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.checkOutDate || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.totalNumOfGuest || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.room?.roomType || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                            disabled={isLoading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No bookings found.</p>
            )}
          </div>
        )}

        {/* Flights Tab */}
        {activeTab === 'flights' && !isLoading && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Flights</h3>
            {flights.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Airline</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {flights.map((flight) => (
                      <tr key={flight.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{flight.flightNumber || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{flight.airline || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {flight.departure || 'N/A'} → {flight.destination || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {flight.departureTime || 'N/A'} - {flight.arrivalTime || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${flight.price || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteFlight(flight.id)}
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                            disabled={isLoading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No flights found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;