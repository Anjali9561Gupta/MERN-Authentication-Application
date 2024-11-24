import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    
    setErrorMessage('');

    const userData = { username, email, password, role };

    try {
      
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);

      // Handle successful registration
      console.log('User registered successfully', response.data);
      navigate('/login'); 
    } catch (error) {
      console.error('Registration failed', error);
      setErrorMessage('Registration failed. Please try again.'); 
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Register</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <select onChange={(e) => setRole(e.target.value)} value={role} required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="input-group">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
