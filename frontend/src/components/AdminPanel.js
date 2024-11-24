import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Manage Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name} - {user.email} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
