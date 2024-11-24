import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if there's a stored token and validate the user
    const token = localStorage.getItem('authToken');
    if (token) {
     
      const decodedUser = jwtDecode(token); 
      setUser(decodedUser);
    }
  }, []);

  const login = (credentials) => {
    
    axios.post('/api/login', credentials)
      .then(response => {
        const { token, user } = response.data;
        localStorage.setItem('authToken', token);
        setUser(user); 
      })
      .catch(error => {
        console.error('Login failed', error);
      });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
