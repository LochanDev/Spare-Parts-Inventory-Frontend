export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh',
  
  // Parts
  PARTS: '/api/parts',
  PART_BY_ID: (id) => `/api/parts/${id}`,
  CREATE_PART: '/api/parts',
  UPDATE_PART: (id) => `/api/parts/${id}`,
  DELETE_PART: (id) => `/api/parts/${id}`,
  SEARCH_PARTS: '/api/parts/search',
  LOW_STOCK_PARTS: '/api/parts/low-stock',
  
  // Orders
  ORDERS: '/api/orders',
  ORDER_BY_ID: (id) => `/api/orders/${id}`,
  CREATE_ORDER: '/api/orders',
  UPDATE_ORDER: (id) => `/api/orders/${id}`,
  DELETE_ORDER: (id) => `/api/orders/${id}`,
  
  // Suppliers
  SUPPLIERS: '/api/suppliers',
  SUPPLIER_BY_ID: (id) => `/api/suppliers/${id}`,
  CREATE_SUPPLIER: '/api/suppliers',
  UPDATE_SUPPLIER: (id) => `/api/suppliers/${id}`,
  DELETE_SUPPLIER: (id) => `/api/suppliers/${id}`,
  
  // Reports
  INVENTORY_REPORT: '/api/reports/inventory',
  SALES_REPORT: '/api/reports/sales',
  EXPORT_REPORT: '/api/reports/export',
};

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
};

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
};

export const PART_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DISCONTINUED: 'DISCONTINUED',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 25, 50, 100],
};

export const TOAST_DURATION = 4000;

export const DATE_FORMAT = 'dd/MM/yyyy';
export const DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm';
