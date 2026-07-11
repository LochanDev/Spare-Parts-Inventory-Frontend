import api from '../api/axiosConfig';
import { API_ENDPOINTS } from '../utils/constants';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../utils/helpers';

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });

      // Backend returns flat object: { id, username, email, role, accessToken, tokenType, expiresIn }
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
        message: error.response?.data?.message || 'Login failed',
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

  getCurrentUser: () => {
    return getLocalStorage('user');
  },

  getAccessToken: () => {
    return getLocalStorage('accessToken');
  },

  isAuthenticated: () => {
    return !!getLocalStorage('accessToken');
  },

  refreshToken: async () => {
    try {
      const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN);
      const { accessToken } = response.data;
      setLocalStorage('accessToken', accessToken);
      return { success: true, accessToken };
    } catch (error) {
      return { success: false, message: 'Token refresh failed' };
    }
  },

  updateUserProfile: async (userId, userData) => {
    try {
      const response = await api.put(`/api/users/${userId}`, userData);
      setLocalStorage('user', response.data);
      return { success: true, user: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Profile update failed',
      };
    }
  },

  changePassword: async (userId, oldPassword, newPassword) => {
    try {
      await api.post(`/api/users/${userId}/change-password`, { oldPassword, newPassword });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Password change failed',
      };
    }
  },
};

export default authService;
