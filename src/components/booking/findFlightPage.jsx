import React, { useState } from 'react';

const FindFlightPage = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Mô phỏng dữ liệu chuyến bay
  const mockFlights = [
    {
      id: 1,
      flightNumber: 'VN123',
      departure: 'Hanoi',
      arrival: 'Ho Chi Minh',
      date: '2025-05-20',
      time: '10:00',
    },
    {
      id: 2,
      flightNumber: 'VN456',
      departure: 'Hanoi',
      arrival: 'Da Nang',
      date: '2025-05-20',
      time: '14:00',
    },
    {
      id: 3,
      flightNumber: 'VN789',
      departure: 'Ho Chi Minh',
      arrival: 'Hanoi',
      date: '2025-05-21',
      time: '09:00',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setError(null);

    if (!departure || !arrival || !date) {
      setError('Vui lòng nhập đầy đủ thông tin tìm kiếm.');
      setResults([]);
      return;
    }

    // Tìm chuyến bay dựa trên mock data (thực tế bạn gọi API backend)
    const filtered = mockFlights.filter(
      (flight) =>
        flight.departure.toLowerCase() === departure.toLowerCase().trim() &&
        flight.arrival.toLowerCase() === arrival.toLowerCase().trim() &&
        flight.date === date
    );

    if (filtered.length === 0) {
      setError('Không tìm thấy chuyến bay phù hợp.');
      setResults([]);
    } else {
      setResults(filtered);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Tìm chuyến bay</h1>

      <form onSubmit={handleSearch} className="space-y-4 mb-8">
        <div>
          <label htmlFor="departure" className="block font-semibold mb-1">
            Điểm đi
          </label>
          <input
            id="departure"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            placeholder="Nhập điểm đi"
          />
        </div>

        <div>
          <label htmlFor="arrival" className="block font-semibold mb-1">
            Điểm đến
          </label>
          <input
            id="arrival"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            placeholder="Nhập điểm đến"
          />
        </div>

        <div>
          <label htmlFor="date" className="block font-semibold mb-1">
            Ngày đi
          </label>
          <input
            id="date"
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Tìm kiếm
        </button>
      </form>

      {/* Kết quả tìm kiếm */}
      {results.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Kết quả tìm kiếm</h2>
          <ul className="space-y-3">
            {results.map((flight) => (
              <li
                key={flight.id}
                className="border p-4 rounded hover:shadow-md transition"
              >
                <p>
                  <strong>{flight.flightNumber}</strong> - {flight.departure} →{' '}
                  {flight.arrival}
                </p>
                <p>Ngày: {flight.date}</p>
                <p>Giờ: {flight.time}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FindFlightPage;
