import React, { useState, useEffect } from 'react';

const EditBooking = ({ bookingData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    flightNumber: '',
    seatNumber: '',
    bookingDate: '',
  });

  useEffect(() => {
    if (bookingData) {
      // Nếu bookingDate là ISO string, tách ngày thôi
      const bookingDate = bookingData.bookingDate ? bookingData.bookingDate.split('T')[0] : '';
      setFormData({
        customerName: bookingData.customerName || '',
        phone: bookingData.phone || '',
        email: bookingData.email || '',
        flightNumber: bookingData.flightNumber || '',
        seatNumber: bookingData.seatNumber || '',
        bookingDate,
      });
    }
  }, [bookingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu cập nhật lên trên
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-semibold">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
              pattern="[0-9+ -]*"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
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

          <div>
            <label className="block mb-1 font-semibold">Seat Number</label>
            <input
              type="text"
              name="seatNumber"
              value={formData.seatNumber}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Booking Date</label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="flex space-x-4 mt-6">
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

export default EditBooking;
