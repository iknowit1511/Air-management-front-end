import React, { useState, useEffect } from 'react';

const AllFlightPage = () => {
  const [flights, setFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Dữ liệu giả lập - bạn có thể thay bằng API call
  useEffect(() => {
    const sampleFlights = [
      {
        id: 1,
        flightNumber: 'VN123',
        departure: 'Ho Chi Minh City',
        arrival: 'Hanoi',
        departureTime: '2025-06-01T08:00',
        arrivalTime: '2025-06-01T10:00',
        price: 150,
      },
      {
        id: 2,
        flightNumber: 'JQ456',
        departure: 'Hanoi',
        arrival: 'Da Nang',
        departureTime: '2025-06-02T13:00',
        arrivalTime: '2025-06-02T14:30',
        price: 120,
      },
      {
        id: 3,
        flightNumber: 'VN789',
        departure: 'Da Nang',
        arrival: 'Ho Chi Minh City',
        departureTime: '2025-06-03T15:00',
        arrivalTime: '2025-06-03T17:00',
        price: 160,
      },
    ];
    setFlights(sampleFlights);
  }, []);

  // Lọc theo số hiệu chuyến bay hoặc điểm đi/đến
  const filteredFlights = flights.filter((flight) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      flight.flightNumber.toLowerCase().includes(lowerSearch) ||
      flight.departure.toLowerCase().includes(lowerSearch) ||
      flight.arrival.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Flights</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by flight number, departure or arrival"
          className="w-full max-w-md border rounded p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredFlights.length === 0 ? (
        <p>No flights found.</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-2 px-4">Flight Number</th>
              <th className="py-2 px-4">Departure</th>
              <th className="py-2 px-4">Arrival</th>
              <th className="py-2 px-4">Departure Time</th>
              <th className="py-2 px-4">Arrival Time</th>
              <th className="py-2 px-4">Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {filteredFlights.map((flight) => (
              <tr key={flight.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 font-semibold">{flight.flightNumber}</td>
                <td className="py-2 px-4">{flight.departure}</td>
                <td className="py-2 px-4">{flight.arrival}</td>
                <td className="py-2 px-4">{new Date(flight.departureTime).toLocaleString()}</td>
                <td className="py-2 px-4">{new Date(flight.arrivalTime).toLocaleString()}</td>
                <td className="py-2 px-4">{flight.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllFlightPage;
