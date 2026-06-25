import api from '../api/axiosConfig';
import { API_ENDPOINTS } from '../utils/constants';

const reportService = {
  getInventoryReport: async (filters = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.INVENTORY_REPORT, {
        params: filters,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch inventory report',
      };
    }
  },

  getSalesReport: async (filters = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.SALES_REPORT, {
        params: filters,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch sales report',
      };
    }
  },

  getSupplierReport: async (filters = {}) => {
    try {
      const response = await api.get('/api/reports/suppliers', {
        params: filters,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch supplier report',
      };
    }
  },

  getOrderReport: async (filters = {}) => {
    try {
      const response = await api.get('/api/reports/orders', {
        params: filters,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch order report',
      };
    }
  },

  exportReport: async (reportType, format = 'csv', filters = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.EXPORT_REPORT, {
        params: { reportType, format, ...filters },
        responseType: 'blob',
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${reportType}_report.${format}`
      );
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to export report',
      };
    }
  },

  getStockAlerts: async () => {
    try {
      const response = await api.get('/api/reports/stock-alerts');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch stock alerts',
      };
    }
  },

  getDashboardMetrics: async () => {
    try {
      const response = await api.get('/api/reports/metrics');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch metrics',
      };
    }
  },
};

export default reportService;
