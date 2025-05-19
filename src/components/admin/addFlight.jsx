import React, { useState } from 'react';

const AddFlight = () => {
  const [formData, setFormData] = useState({
    airline: '',
    flightNumber: '',
    from: '',
    to: '',
    departureDate: '',
    departureTime: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi dữ liệu (ví dụ gọi API)
    console.log('New flight data:', formData);
    alert('Flight added successfully!');
    // Reset form
    setFormData({
      airline: '',
      flightNumber: '',
      from: '',
      to: '',
      departureDate: '',
      departureTime: '',
      price: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Flight</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Airline</label>
            <input
              type="text"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Vietnam Airlines"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="VN123"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">From</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Hanoi"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-semibold">To</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Ho Chi Minh City"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-semibold">Departure Time</label>
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Price (USD)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="150"
              min="0"
              step="any"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Add Flight
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFlight;
