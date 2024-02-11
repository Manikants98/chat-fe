import axios, { AxiosInstance, AxiosResponse } from 'axios';

let token: string | null = null;

if (typeof window !== 'undefined') {
  token = localStorage.getItem('chat_token');
}

export const baseURL = 'https://chatmkx.onrender.com/';
// export const baseURL = 'http://localhost:4000/';

const axio: AxiosInstance = axios.create({ baseURL });

axio.interceptors.request.use(
  (config: any) => {
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axio.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axio;
