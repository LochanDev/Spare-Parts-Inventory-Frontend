import api from '../api/axiosConfig';
import { API_ENDPOINTS } from '../utils/constants';
import { getLocalStorage, removeLocalStorage } from '../utils/helpers';

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
      const data = response.data;
      const accessToken = data.accessToken ?? data.token;
      const user = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role,
      };

      // Store token as raw string — use localStorage directly to avoid double-quoting
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data || 'Login failed',
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },
};

export default authService;
