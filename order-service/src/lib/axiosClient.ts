import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://shopee.dev',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;
