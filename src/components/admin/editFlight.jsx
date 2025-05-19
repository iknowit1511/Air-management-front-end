import React, { useState, useEffect } from 'react';

const EditFlight = ({ flightData, onSave, onCancel }) => {
  // flightData: object chuyến bay cần chỉnh sửa, ví dụ lấy từ API
  // onSave: callback khi lưu dữ liệu mới
  // onCancel: callback khi hủy chỉnh sửa

  const [formData, setFormData] = useState({
    airline: '',
    flightNumber: '',
    from: '',
    to: '',
    departureDate: '',
    departureTime: '',
    price: '',
  });

  useEffect(() => {
    if (flightData) {
      // Chuyển đổi datetime thành ngày + giờ tách riêng nếu cần
      const departureDate = flightData.departureDate.split('T')[0]; // "YYYY-MM-DD"
      const departureTime = flightData.departureDate.split('T')[1]?.slice(0, 5) || ''; // "HH:mm"
      
      setFormData({
        airline: flightData.airline || '',
        flightNumber: flightData.flightNumber || '',
        from: flightData.from || '',
        to: flightData.to || '',
        departureDate,
        departureTime,
        price: flightData.price || '',
      });
    }
  }, [flightData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ghép ngày và giờ thành 1 chuỗi ISO nếu cần
    const updatedFlight = {
      ...formData,
      departureDate: `${formData.departureDate}T${formData.departureTime}:00`,
    };
    onSave(updatedFlight);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Flight</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Airline</label>
            <input
              type="text"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              className="w-full border rounded p-2"
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
              min="0"
              step="any"
              required
            />
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-400 text-white py-3 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFlight;
