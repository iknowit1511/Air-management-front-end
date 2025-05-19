import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/apiService';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    const isLogout = window.confirm('Are you sure you want to logout this user?');
    if (isLogout) {
        ApiService.logout();
        navigate('/home');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-white font-extrabold text-2xl cursor-pointer"
          onClick={() => navigate('/home')}
        >
          JK Travel
        </div>
        <ul className="flex items-center space-x-4">
          <li>
            <NavLink to="/home" activeclassname="active" className="text-white font-medium px-4 py-2 rounded-md transition duration-300 hover:bg-blue-400">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/tours" activeclassname="active" className="text-white font-medium px-4 py-2 rounded-md transition duration-300 hover:bg-blue-400">
              Tour
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to="/profile" activeclassname="active" className="text-white font-medium px-4 py-2 rounded-md transition duration-300 hover:bg-blue-400">
                Profile
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink to="/admin" activeclassname="active" className="text-white font-medium px-4 py-2 rounded-md transition duration-300 hover:bg-blue-400">
                Admin
              </NavLink>
            </li>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/login" activeclassname="active" className="text-white font-medium px-4 py-2 rounded-md transition duration-300 hover:bg-blue-400">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" activeclassname="active" className="text-white font-medium px-4 py-2 rounded-md transition duration-300 hover:bg-blue-400">
                  Register
                </NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li
              onClick={handleLogout}
              className="text-white font-medium px-4 py-2 rounded-md transition duration-300 hover:bg-red-600 cursor-pointer"
            >
              Logout
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
