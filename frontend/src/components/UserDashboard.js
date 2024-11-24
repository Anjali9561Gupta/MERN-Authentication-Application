import React from 'react';
import { useAuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  const { user, logout } = useAuthContext(); 

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
