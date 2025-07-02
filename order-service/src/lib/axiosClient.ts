import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3001', // 👈 Your backend base URL
    withCredentials: true, // if you're using cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
