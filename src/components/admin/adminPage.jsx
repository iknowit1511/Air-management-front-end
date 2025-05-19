import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-blue-500 text-white py-4 px-6 rounded-lg shadow hover:bg-blue-600 focus:outline-none"
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate('/admin/flights')}
            className="bg-green-500 text-white py-4 px-6 rounded-lg shadow hover:bg-green-600 focus:outline-none"
          >
            Manage Flights
          </button>
          <button
            onClick={() => navigate('/admin/bookings')}
            className="bg-purple-500 text-white py-4 px-6 rounded-lg shadow hover:bg-purple-600 focus:outline-none"
          >
            Manage Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
