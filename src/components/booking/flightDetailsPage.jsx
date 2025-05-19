import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FlightDetailsPage = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  // Demo data tạm thời
  const sampleFlights = [
    {
      id: '1',
      flightNumber: 'VN123',
      departure: 'Ho Chi Minh City',
      arrival: 'Hanoi',
      departureTime: '2025-06-01T08:00',
      arrivalTime: '2025-06-01T10:00',
      price: 150,
      aircraft: 'Boeing 787',
      status: 'On Time',
      duration: '2h',
      gate: 'A12',
    },
    {
      id: '2',
      flightNumber: 'JQ456',
      departure: 'Hanoi',
      arrival: 'Da Nang',
      departureTime: '2025-06-02T13:00',
      arrivalTime: '2025-06-02T14:30',
      price: 120,
      aircraft: 'Airbus A320',
      status: 'Delayed',
      duration: '1h 30m',
      gate: 'B5',
    },
  ];

  useEffect(() => {
    // Giả lập fetch flight details từ API
    const foundFlight = sampleFlights.find((f) => f.id === flightId);
    if (foundFlight) {
      setFlight(foundFlight);
    }
    setLoading(false);
  }, [flightId]);

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex justify-center items-center">
        <p>Loading flight details...</p>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="p-6 min-h-screen flex flex-col justify-center items-center">
        <p className="text-xl mb-4">Flight not found.</p>
        <button
          onClick={() => navigate('/all-flights')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Flights List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Flight Details - {flight.flightNumber}</h1>
      <div className="bg-white rounded shadow p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Route</h2>
          <p>{flight.departure} → {flight.arrival}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Departure Time</h2>
          <p>{new Date(flight.departureTime).toLocaleString()}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Arrival Time</h2>
          <p>{new Date(flight.arrivalTime).toLocaleString()}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Price</h2>
          <p>${flight.price}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Aircraft</h2>
          <p>{flight.aircraft}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Status</h2>
          <p>{flight.status}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Duration</h2>
          <p>{flight.duration}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Gate</h2>
          <p>{flight.gate}</p>
        </div>
        <button
          onClick={() => navigate('/all-flights')}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Flights List
        </button>
      </div>
    </div>
  );
};

export default FlightDetailsPage;
