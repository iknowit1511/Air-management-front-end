import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/apiService';

const AddFlight = () => {
  const navigate = useNavigate();
  const [flightDetails, setFlightDetails] = useState({
    airline: '',
    flightNumber: '',
    from: '',
    to: '',
    departureDate: '',
    departureTime: '',
    price: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addFlight = async () => {
    // Validate required fields
    if (
      !flightDetails.airline ||
      !flightDetails.flightNumber ||
      !flightDetails.from ||
      !flightDetails.to ||
      !flightDetails.departureDate ||
      !flightDetails.departureTime ||
      !flightDetails.price
    ) {
      setError('All flight details must be provided.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    // Validate price (must be a positive number)
    if (isNaN(flightDetails.price) || flightDetails.price <= 0) {
      setError('Price must be a positive number.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    if (!window.confirm('Do you want to add this flight?')) {
      return;
    }

    try {
      // Combine departureDate and departureTime into a single ISO string
      const departureDateTime = `${flightDetails.departureDate}T${flightDetails.departureTime}:00`;

      // Prepare formData for API submission
      const formData = new FormData();
      formData.append('airline', flightDetails.airline);
      formData.append('flightNumber', flightDetails.flightNumber);
      formData.append('from', flightDetails.from);
      formData.append('to', flightDetails.to);
      formData.append('departureDate', departureDateTime); // Gửi departureDateTime
      formData.append('price', flightDetails.price);

      const result = await ApiService.addFlight(formData);
      if (result.status === 200) {
        setSuccess('Flight added successfully.');
        setTimeout(() => {
          setSuccess('');
          navigate('/admin/manage-flights');
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="edit-flight-container p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Flight</h2>
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}
      {success && <p className="text-center text-green-600 mb-4">{success}</p>}
      <div className="edit-flight-form max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="form-group mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Airline</label>
          <input
            type="text"
            name="airline"
            value={flightDetails.airline}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Vietnam Airlines"
          />
        </div>

        <div className="form-group mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Flight Number</label>
          <input
            type="text"
            name="flightNumber"
            value={flightDetails.flightNumber}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="VN123"
          />
        </div>

        <div className="form-group mb-4 flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold text-gray-700">From</label>
            <input
              type="text"
              name="from"
              value={flightDetails.from}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Hanoi"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold text-gray-700">To</label>
            <input
              type="text"
              name="to"
              value={flightDetails.to}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ho Chi Minh City"
            />
          </div>
        </div>

        <div className="form-group mb-4 flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold text-gray-700">Departure Date</label>
            <input
              type="date"
              name="departureDate"
              value={flightDetails.departureDate}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold text-gray-700">Departure Time</label>
            <input
              type="time"
              name="departureTime"
              value={flightDetails.departureTime}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="form-group mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Price (USD)</label>
          <input
            type="number"
            name="price"
            value={flightDetails.price}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="150"
            min="0"
            step="any"
          />
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
          onClick={addFlight}
        >
          Add Flight
        </button>
      </div>
    </div>
  );
};

export default AddFlight;