import api from '../api/axiosConfig';
import { API_ENDPOINTS } from '../utils/constants';

const supplierService = {
  getAllSuppliers: async (page = 0, size = 10, sort = 'id,desc') => {
    try {
      const response = await api.get(API_ENDPOINTS.SUPPLIERS, {
        params: { page, size, sort },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch suppliers',
      };
    }
  },

  getSupplierById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.SUPPLIER_BY_ID(id));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch supplier',
      };
    }
  },

  createSupplier: async (supplierData) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.CREATE_SUPPLIER,
        supplierData
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create supplier',
      };
    }
  },

  updateSupplier: async (id, supplierData) => {
    try {
      const response = await api.put(
        API_ENDPOINTS.UPDATE_SUPPLIER(id),
        supplierData
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update supplier',
      };
    }
  },

  deleteSupplier: async (id) => {
    try {
      await api.delete(API_ENDPOINTS.DELETE_SUPPLIER(id));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete supplier',
      };
    }
  },

  searchSuppliers: async (query) => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.SUPPLIERS}/search`,
        {
          params: { q: query },
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Search failed',
      };
    }
  },

  getSupplierPartsList: async (supplierId, page = 0, size = 10) => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.SUPPLIERS}/${supplierId}/parts`,
        {
          params: { page, size },
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch supplier parts',
      };
    }
  },

  getSupplierStats: async (supplierId) => {
    try {
      const response = await api.get(
        `${API_ENDPOINTS.SUPPLIERS}/${supplierId}/stats`
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch supplier stats',
      };
    }
  },
};

export default supplierService;
