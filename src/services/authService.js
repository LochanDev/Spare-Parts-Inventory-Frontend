import api from '../api/axiosConfig';
import { API_ENDPOINTS } from '../utils/constants';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../utils/helpers';

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
      setLocalStorage('accessToken', accessToken);
      setLocalStorage('user', user);
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
    removeLocalStorage('accessToken');
    removeLocalStorage('user');
  },

  getCurrentUser: () => getLocalStorage('user'),
  getAccessToken: () => getLocalStorage('accessToken'),
  isAuthenticated: () => !!getLocalStorage('accessToken'),
};

export default authService;
