import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getLocalStorage, removeLocalStorage } from '../utils/helpers';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config) => {
    let token = getLocalStorage('accessToken');
    if (token) {
      // Strip extra quotes added by JSON.stringify in setLocalStorage
      if (typeof token === 'string') {
        token = token.replace(/^"|"$/g, '');
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
