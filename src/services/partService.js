import api from '../api/axiosConfig';
import { API_ENDPOINTS } from '../utils/constants';

const partService = {
  getAllParts: async (page = 0, size = 10, sort = 'id,desc') => {
    try {
      const response = await api.get(API_ENDPOINTS.PARTS, {
        params: { page, size, sort },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch parts',
      };
    }
  },

  getPartById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.PART_BY_ID(id));
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch part',
      };
    }
  },

  createPart: async (partData) => {
    try {
      const response = await api.post(API_ENDPOINTS.CREATE_PART, partData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create part',
      };
    }
  },

  updatePart: async (id, partData) => {
    try {
      const response = await api.put(API_ENDPOINTS.UPDATE_PART(id), partData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update part',
      };
    }
  },

  deletePart: async (id) => {
    try {
      await api.delete(API_ENDPOINTS.DELETE_PART(id));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete part',
      };
    }
  },

  searchParts: async (query) => {
    try {
      const response = await api.get(API_ENDPOINTS.SEARCH_PARTS, {
        params: { q: query },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Search failed',
      };
    }
  },

  getLowStockParts: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.LOW_STOCK_PARTS);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch low stock parts',
      };
    }
  },

  bulkImportParts: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/api/parts/bulk-import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Bulk import failed',
      };
    }
  },
};

export default partService;
