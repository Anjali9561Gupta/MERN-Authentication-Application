import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await api.get('/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Manage Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.name} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
