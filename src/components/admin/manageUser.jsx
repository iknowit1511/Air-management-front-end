import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/apiService';
import Pagination from '../common/Pagination';

const ManageUserPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Số lượng người dùng mỗi trang
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await ApiService.getAllUsers();
                console.log('API Response:', response); // Kiểm tra phản hồi từ API
                const allUsers = response.userList || [];
                setUsers(allUsers);
                setFilteredUsers(allUsers);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setSelectedRole(role);
        setFilteredUsers(role ? users.filter((user) => user.role === role) : users);
        setCurrentPage(1); // Reset về trang đầu sau khi lọc
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await ApiService.deleteUser(userId);
                const updatedUsers = users.filter((user) => user.id !== userId);
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);
            } catch (error) {
                console.error('Error deleting user:', error.message);
            }
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfLastUser - usersPerPage, indexOfLastUser);

    return (
        <div className="all-users p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                    <label className="text-gray-700 font-medium">Filter by Role:</label>
                    <select
                        value={selectedRole}
                        onChange={handleRoleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">All</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        onClick={() => navigate('/admin/add-user')}
                    >
                        Add User
                    </button>
                </div>
            </div>

            <div className="user-list">
                {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-2"
                        >
                            <div>
                                <p className="text-gray-800 font-medium">{user.name}</p>
                                <p className="text-gray-600">Email: {user.email}</p>
                                <p className="text-gray-600">Role: {user.role}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300"
                                    onClick={() => navigate(`/admin/edit-user/${user.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">No users found.</p>
                )}
            </div>

            <Pagination
                roomsPerPage={usersPerPage}
                totalRooms={filteredUsers.length}
                currentPage={currentPage}
                paginate={setCurrentPage}
            />
        </div>
    );
};

export default ManageUserPage;
