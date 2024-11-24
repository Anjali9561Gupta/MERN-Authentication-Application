import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser } from '../services/api';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const token = localStorage.getItem('token');

    const loadUsers = async () => {
        const data = await fetchUsers(token);
        setUsers(data);
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const newUser = { name, email, password, role };
        await addUser(newUser, token);
        setName('');
        setEmail('');
        setPassword('');
        setRole('User');
        loadUsers();
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            <form onSubmit={handleAddUser}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit">Add User</button>
            </form>
            <h3>All Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.name} - {user.role}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
