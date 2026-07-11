import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getLocalStorage, removeLocalStorage } from '../utils/helpers';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Only redirect to /login on 401 for NON-auth endpoints
// Auth endpoints (login/register) returning 401/400 should be handled by the caller
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint = error.config?.url?.includes('/auth/');
    if (error.response?.status === 401 && !isAuthEndpoint) {
      removeLocalStorage('accessToken');
      removeLocalStorage('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
