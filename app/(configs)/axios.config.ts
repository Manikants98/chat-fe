import axios, { AxiosInstance } from 'axios';

const axio: AxiosInstance = axios.create({
  baseURL: 'https://api-chats-mkx.onrender.com/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axio;
