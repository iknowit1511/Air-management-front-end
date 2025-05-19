import React, { useState } from 'react';
import AddFlight from './addFlight';
import EditFlight from './editFlight';

const ManagerFlight = () => {
  const [flights, setFlights] = useState([
    // Dữ liệu mẫu
    {
      id: 1,
      airline: 'Vietnam Airlines',
      flightNumber: 'VN123',
      from: 'Hanoi',
      to: 'Ho Chi Minh City',
      departureDate: '2025-06-01T10:00:00',
      price: 150,
    },
    {
      id: 2,
      airline: 'Jetstar',
      flightNumber: 'JQ456',
      from: 'Da Nang',
      to: 'Hanoi',
      departureDate: '2025-06-05T15:30:00',
      price: 90,
    },
  ]);

  const [mode, setMode] = useState('list'); // 'list' | 'add' | 'edit'
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleAddClick = () => {
    setMode('add');
  };

  const handleEditClick = (flight) => {
    setSelectedFlight(flight);
    setMode('edit');
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      setFlights((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleSaveNewFlight = (newFlight) => {
    const id = flights.length > 0 ? Math.max(...flights.map(f => f.id)) + 1 : 1;
    setFlights((prev) => [...prev, { ...newFlight, id }]);
    setMode('list');
  };

  const handleSaveEditedFlight = (updatedFlight) => {
    setFlights((prev) =>
      prev.map((f) => (f.id === selectedFlight.id ? { ...updatedFlight, id: f.id } : f))
    );
    setSelectedFlight(null);
    setMode('list');
  };

  const handleCancel = () => {
    setSelectedFlight(null);
    setMode('list');
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {mode === 'list' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Flight Management</h1>
            <button
              onClick={handleAddClick}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Flight
            </button>
          </div>

          {flights.length === 0 ? (
            <p>No flights available.</p>
          ) : (
            <table className="min-w-full bg-white rounded shadow-md">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th className="py-2 px-4">Airline</th>
                  <th className="py-2 px-4">Flight Number</th>
                  <th className="py-2 px-4">From</th>
                  <th className="py-2 px-4">To</th>
                  <th className="py-2 px-4">Departure</th>
                  <th className="py-2 px-4">Price (USD)</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => {
                  const departure = new Date(flight.departureDate).toLocaleString();
                  return (
                    <tr key={flight.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{flight.airline}</td>
                      <td className="py-2 px-4">{flight.flightNumber}</td>
                      <td className="py-2 px-4">{flight.from}</td>
                      <td className="py-2 px-4">{flight.to}</td>
                      <td className="py-2 px-4">{departure}</td>
                      <td className="py-2 px-4">{flight.price}</td>
                      <td className="py-2 px-4 space-x-2">
                        <button
                          onClick={() => handleEditClick(flight)}
                          className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(flight.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}

      {mode === 'add' && (
        <AddFlight
          onSubmit={handleSaveNewFlight}
          onCancel={handleCancel}
        />
      )}

      {mode === 'edit' && selectedFlight && (
        <EditFlight
          flightData={selectedFlight}
          onSave={handleSaveEditedFlight}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ManagerFlight;
