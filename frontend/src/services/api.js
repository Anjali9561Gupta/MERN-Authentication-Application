import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mern-authentication-application-3vxj.onrender.com/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
