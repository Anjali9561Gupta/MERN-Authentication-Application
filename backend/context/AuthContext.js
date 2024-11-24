
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if user is logged in on component mount
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/auth/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(res.data);
                } catch (err) {
                    console.error(err);
                    setUser(null);
                }
            }
        };
        fetchUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('authToken', userData.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
