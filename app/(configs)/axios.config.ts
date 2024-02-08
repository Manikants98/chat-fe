import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
let token: string | null = null;
if (typeof window !== 'undefined') {
  token = localStorage.getItem('chat_token');
}

const axio: AxiosInstance = axios.create({
  baseURL: 'https://chatmkx.onrender.com/',
});
axio.interceptors.request.use(
  (config: any) => {
    // Modify request config if needed, such as adding authorization token

    if (token) {
      // Ensure config.headers exists and set the Authorization header
      config.headers = {
        ...config.headers,
        Authorization: token,
      };
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
axio.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify response data if needed
    return response;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axio;
