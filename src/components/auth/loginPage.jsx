import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../service/apiService';

const LoginPage = ({ onSwitchToRegister }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const from = location.state?.from?.pathname || '/home';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      setSuccess('');
      setTimeout(() => setError(''), 5000);
      return;
    }

    try {
      const response = await ApiService.loginUser({ email, password });
      console.log('Login Response:', response); // Debug phản hồi

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        setSuccess('Logged in successfully!');
        setError('');
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 2000);
      } else {
        setError(response.data?.message || 'Login failed. Please try again.');
        setSuccess('');
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      console.error('Login Error:', error.response || error); // Debug lỗi
      setError(error.response?.data?.message || 'An error occurred during login.');
      setSuccess('');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <button
             onClick={() => navigate('/register')}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;