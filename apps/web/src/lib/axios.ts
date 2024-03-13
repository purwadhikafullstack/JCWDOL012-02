import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const axiosAuth = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const refreshToken = async () => {
  return axiosInstance.post(`${apiUrl}auth/refresh`).then((response) => {
    return response.data.accessToken;
  });
};

axiosAuth.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest.sent) {
      originalRequest.sent = true;
      try {
        const response = await refreshToken();
        error.config.headers['Authorization'] = `Bearer ${response}`;
        localStorage.setItem('accessToken', response);
        return axiosAuth(originalRequest);
      } catch (error) {
        localStorage.removeItem('accessToken');
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
