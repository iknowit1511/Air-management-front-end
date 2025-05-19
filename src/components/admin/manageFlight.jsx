import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/apiService';
import Pagination from '../common/Pagination';
import AddFlight from './addFlight';
import EditFlight from './editFlight';

const ManagerFlight = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('list'); // 'list' | 'add' | 'edit'
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 5; // Số chuyến bay mỗi trang
  const navigate = useNavigate();

  // Fetch flights when component mounts
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getAllFlights();
        console.log('API Response:', response); // Kiểm tra phản hồi từ API
        const flightList = response.flightsList || []; // Sửa lỗi chính tả từ flighstList
        setFlights(flightList);
        setFilteredFlights(flightList);
        setError('');
      } catch (err) {
        setError('Failed to fetch flights. Please try again.');
        console.error('Error fetching flights:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  // Handle add flight
  const handleAddClick = () => {
    setMode('add');
    setSelectedFlight(null);
  };

  // Handle edit flight
  const handleEditClick = (flight) => {
    setSelectedFlight(flight);
    setMode('edit');
  };

  // Handle delete flight
  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        setLoading(true);
        await ApiService.deleteFlight(id);
        setFlights((prev) => prev.filter((f) => f.id !== id));
        setFilteredFlights((prev) => prev.filter((f) => f.id !== id));
        setError('');
      } catch (err) {
        setError('Failed to delete flight. Please try again.');
        console.error('Error deleting flight:', err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle save new flight
  const handleSaveNewFlight = async (newFlight) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(newFlight).forEach(([key, value]) => formData.append(key, value));
      const response = await ApiService.addFlight(formData);
      setFlights((prev) => [...prev, response.data]);
      setFilteredFlights((prev) => [...prev, response.data]);
      setMode('list');
      setError('');
    } catch (err) {
      setError('Failed to add flight. Please try again.');
      console.error('Error adding flight:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle save edited flight
  const handleSaveEditedFlight = async (updatedFlight) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(updatedFlight).forEach(([key, value]) => formData.append(key, value));
      await ApiService.updateFlight(updatedFlight.id, formData);
      setFlights((prev) =>
        prev.map((f) => (f.id === updatedFlight.id ? { ...updatedFlight, id: f.id } : f))
      );
      setFilteredFlights((prev) =>
        prev.map((f) => (f.id === updatedFlight.id ? { ...updatedFlight, id: f.id } : f))
      );
      setSelectedFlight(null);
      setMode('list');
      setError('');
    } catch (err) {
      setError('Failed to update flight. Please try again.');
      console.error('Error updating flight:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setSelectedFlight(null);
    setMode('list');
  };

  // Pagination logic
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Flight Management</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
          disabled={loading}
        >
          Add Flight
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

      {!loading && mode === 'list' && (
        <>
          {filteredFlights.length === 0 ? (
            <p className="text-center text-gray-600">No flights available.</p>
          ) : (
            <div>
              <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    <th className="py-3 px-4">Airline</th>
                    <th className="py-3 px-4">Flight Number</th>
                    <th className="py-3 px-4">From</th>
                    <th className="py-3 px-4">To</th>
                    <th className="py-3 px-4">Departure</th>
                    <th className="py-3 px-4">Price (USD)</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFlights.map((flight) => (
                    <tr
                      key={flight.id}
                      className="border-b hover:bg-gray-50 transition duration-200"
                    >
                      <td className="py-2 px-4">{flight.airline}</td>
                      <td className="py-2 px-4">{flight.flightNumber}</td>
                      <td className="py-2 px-4">{flight.from}</td>
                      <td className="py-2 px-4">{flight.to}</td>
                      <td className="py-2 px-4">
                        {new Date(flight.departureDate).toLocaleString()}
                      </td>
                      <td className="py-2 px-4">${flight.price}</td>
                      <td className="py-2 px-4 space-x-2">
                        <button
                          onClick={() => handleEditClick(flight)}
                          className="bg-yellow-400 text-white px-2 py-1 rounded-md hover:bg-yellow-500 transition duration-300"
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(flight.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition duration-300"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                roomsPerPage={flightsPerPage}
                totalRooms={filteredFlights.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>
          )}
        </>
      )}

      {mode === 'add' && (
        <AddFlight
          onSubmit={handleSaveNewFlight}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {mode === 'edit' && selectedFlight && (
        <EditFlight
          flightData={selectedFlight}
          onSave={handleSaveEditedFlight}
          onCancel={handleCancel}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ManagerFlight;