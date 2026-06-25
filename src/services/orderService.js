import api from '../api/axiosConfig';
import { API_ENDPOINTS } from '../utils/constants';

const orderService = {
  getAllOrders: async (page = 0, size = 10, sort = 'id,desc') => {
    try {
      const response = await api.get(API_ENDPOINTS.ORDERS, {
        params: { page, size, sort },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch orders',
      };
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.ORDER_BY_ID(id));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch order',
      };
    }
  },

  createOrder: async (orderData) => {
    try {
      const response = await api.post(API_ENDPOINTS.CREATE_ORDER, orderData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create order',
      };
    }
  },

  updateOrder: async (id, orderData) => {
    try {
      const response = await api.put(API_ENDPOINTS.UPDATE_ORDER(id), orderData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update order',
      };
    }
  },

  deleteOrder: async (id) => {
    try {
      await api.delete(API_ENDPOINTS.DELETE_ORDER(id));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete order',
      };
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const response = await api.patch(`${API_ENDPOINTS.ORDERS}/${id}/status`, {
        status,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update order status',
      };
    }
  },

  getOrdersBySupplier: async (supplierId, page = 0, size = 10) => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.SUPPLIERS}/${supplierId}/orders`,
        {
          params: { page, size },
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch supplier orders',
      };
    }
  },

  getOrdersByDateRange: async (startDate, endDate, page = 0, size = 10) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.ORDERS}/filter/date-range`, {
        params: { startDate, endDate, page, size },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch orders',
      };
    }
  },
};

export default orderService;
