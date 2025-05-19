import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/apiService';

const SearchFlightPage = () => {
  const [formData, setFormData] = useState({
    departureId: '',
    destinationId: '',
    departureDate: '',
    flightTime: '',
    seatClass: 'Economy',
    passengers: 1,
  });
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!formData.departureId || !formData.destinationId || !formData.departureDate) {
        throw new Error('Please fill in all required fields');
      }
      if (formData.departureId === formData.destinationId) {
        throw new Error('Departure and destination cannot be the same');
      }

      const response = await ApiService.searchFlights({
        departureId: formData.departureId,
        destinationId: formData.destinationId,
        departureDate: formData.departureDate,
        flightTime: formData.flightTime,
        seatClass: formData.seatClass,
        passengers: formData.passengers,
      });

      const flightResults = response.data?.flights || response.flights || [];
      setFlights(flightResults);

      if (flightResults.length === 0) {
        setError('No flights found for the given criteria');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to search flights');
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookFlight = (flightId) => {
    navigate(`/book-flight/${flightId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Flights</h2>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="departureId" className="block text-sm font-medium text-gray-700">
                  Departure
                </label>
                <input
                  type="text"
                  id="departureId"
                  name="departureId"
                  value={formData.departureId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., HAN"
                  required
                />
              </div>
              <div>
                <label htmlFor="destinationId" className="block text-sm font-medium text-gray-700">
                  Destination
                </label>
                <input
                  type="text"
                  id="destinationId"
                  name="destinationId"
                  value={formData.destinationId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., SGN"
                  required
                />
              </div>
              <div>
                <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">
                  Departure Date
                </label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="flightTime" className="block text-sm font-medium text-gray-700">
                  Flight Time
                </label>
                <input
                  type="time"
                  id="flightTime"
                  name="flightTime"
                  value={formData.flightTime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="seatClass" className="block text-sm font-medium text-gray-700">
                  Seat Class
                </label>
                <select
                  id="seatClass"
                  name="seatClass"
                  value={formData.seatClass}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>
              <div>
                <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
                  Passengers
                </label>
                <input
                  type="number"
                  id="passengers"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? 'Searching...' : 'Search Flights'}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {!isLoading && flights.length== 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Flight Results</h3>
            <div className="space-y-6">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-600">
                        <strong>Flight:</strong> {flight.flightNumber || 'N/A'}
                      </p>
                      <p className="text-gray-600">
                        <strong>Airline:</strong> {flight.airline || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <strong>Route:</strong> {flight.departure} → {flight.destination}
                      </p>
                      <p className="text-gray-600">
                        <strong>Time:</strong> {flight.departureTime || 'N/A'} - {flight.arrivalTime || 'N/A'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">
                        <strong>Price:</strong> ${flight.price || 'N/A'}/person
                      </p>
                      <button
                        onClick={() => handleBookFlight(flight.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              </div>
        )}
        {!isLoading && flights.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500">
            <p>No flights found. Please try different search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFlightPage;