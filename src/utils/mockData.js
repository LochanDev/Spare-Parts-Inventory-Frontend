// mockData.js — fallback data shown when API is unavailable

export const MOCK_PARTS = {
  content: [
    { id: 1, sku: 'ENG-001', name: 'Engine Oil Filter', category: 'Engine', quantity: 150, minStockLevel: 20, unitPrice: 12.99, totalValue: 1948.50, status: 'ACTIVE', supplierName: 'AutoParts Co', createdAt: '2024-01-10T10:00:00' },
    { id: 2, sku: 'BRK-002', name: 'Brake Pad Set', category: 'Brakes', quantity: 85, minStockLevel: 15, unitPrice: 45.00, totalValue: 3825.00, status: 'ACTIVE', supplierName: 'BrakeMaster Ltd', createdAt: '2024-01-12T10:00:00' },
    { id: 3, sku: 'TRN-003', name: 'Transmission Belt', category: 'Transmission', quantity: 12, minStockLevel: 10, unitPrice: 78.50, totalValue: 942.00, status: 'ACTIVE', supplierName: 'TransTech Inc', createdAt: '2024-01-15T10:00:00' },
    { id: 4, sku: 'ELC-004', name: 'Alternator', category: 'Electrical', quantity: 8, minStockLevel: 5, unitPrice: 220.00, totalValue: 1760.00, status: 'ACTIVE', supplierName: 'ElectroParts', createdAt: '2024-01-18T10:00:00' },
    { id: 5, sku: 'COL-005', name: 'Radiator Coolant Hose', category: 'Cooling', quantity: 3, minStockLevel: 10, unitPrice: 25.00, totalValue: 75.00, status: 'ACTIVE', supplierName: 'CoolSystems Ltd', createdAt: '2024-01-20T10:00:00' },
    { id: 6, sku: 'ENG-006', name: 'Spark Plug Set', category: 'Engine', quantity: 200, minStockLevel: 30, unitPrice: 8.99, totalValue: 1798.00, status: 'ACTIVE', supplierName: 'AutoParts Co', createdAt: '2024-01-22T10:00:00' },
    { id: 7, sku: 'SUS-007', name: 'Shock Absorber', category: 'Suspension', quantity: 45, minStockLevel: 8, unitPrice: 135.00, totalValue: 6075.00, status: 'ACTIVE', supplierName: 'SuspensionPro', createdAt: '2024-01-25T10:00:00' },
    { id: 8, sku: 'EXH-008', name: 'Exhaust Muffler', category: 'Exhaust', quantity: 0, minStockLevel: 5, unitPrice: 189.00, totalValue: 0, status: 'INACTIVE', supplierName: 'ExhaustKing', createdAt: '2024-01-28T10:00:00' },
    { id: 9, sku: 'FUL-009', name: 'Fuel Pump', category: 'Fuel System', quantity: 22, minStockLevel: 6, unitPrice: 95.00, totalValue: 2090.00, status: 'ACTIVE', supplierName: 'FuelTech', createdAt: '2024-02-01T10:00:00' },
    { id: 10, sku: 'BRK-010', name: 'Brake Rotor', category: 'Brakes', quantity: 60, minStockLevel: 10, unitPrice: 65.00, totalValue: 3900.00, status: 'ACTIVE', supplierName: 'BrakeMaster Ltd', createdAt: '2024-02-05T10:00:00' },
  ],
  totalElements: 10,
  totalPages: 1,
  number: 0,
  size: 10,
};

export const MOCK_ORDERS = {
  content: [
    { id: 1, orderNumber: 'ORD-A1B2C3D4', partId: 1, partName: 'Engine Oil Filter', supplierId: 1, supplierName: 'AutoParts Co', quantity: 100, unitPrice: 12.99, totalAmount: 1299.00, status: 'DELIVERED', remarks: 'Urgent restock', deliveryDate: '2024-02-10', orderDate: '2024-02-01T09:00:00', createdAt: '2024-02-01T09:00:00' },
    { id: 2, orderNumber: 'ORD-E5F6G7H8', partId: 2, partName: 'Brake Pad Set', supplierId: 2, supplierName: 'BrakeMaster Ltd', quantity: 50, unitPrice: 45.00, totalAmount: 2250.00, status: 'SHIPPED', remarks: '', deliveryDate: '2024-02-20', orderDate: '2024-02-05T10:00:00', createdAt: '2024-02-05T10:00:00' },
    { id: 3, orderNumber: 'ORD-I9J0K1L2', partId: 3, partName: 'Transmission Belt', supplierId: 3, supplierName: 'TransTech Inc', quantity: 20, unitPrice: 78.50, totalAmount: 1570.00, status: 'PROCESSING', remarks: 'Standard order', deliveryDate: '2024-02-25', orderDate: '2024-02-08T11:00:00', createdAt: '2024-02-08T11:00:00' },
    { id: 4, orderNumber: 'ORD-M3N4O5P6', partId: 5, partName: 'Radiator Coolant Hose', supplierId: 5, supplierName: 'CoolSystems Ltd', quantity: 30, unitPrice: 25.00, totalAmount: 750.00, status: 'PENDING', remarks: 'Low stock alert', deliveryDate: '2024-03-01', orderDate: '2024-02-10T14:00:00', createdAt: '2024-02-10T14:00:00' },
    { id: 5, orderNumber: 'ORD-Q7R8S9T0', partId: 6, partName: 'Spark Plug Set', supplierId: 1, supplierName: 'AutoParts Co', quantity: 200, unitPrice: 8.99, totalAmount: 1798.00, status: 'DELIVERED', remarks: '', deliveryDate: '2024-02-15', orderDate: '2024-02-06T08:00:00', createdAt: '2024-02-06T08:00:00' },
    { id: 6, orderNumber: 'ORD-U1V2W3X4', partId: 4, partName: 'Alternator', supplierId: 4, supplierName: 'ElectroParts', quantity: 10, unitPrice: 220.00, totalAmount: 2200.00, status: 'CANCELLED', remarks: 'Supplier issue', deliveryDate: null, orderDate: '2024-02-09T13:00:00', createdAt: '2024-02-09T13:00:00' },
  ],
  totalElements: 6,
  totalPages: 1,
  number: 0,
  size: 10,
};

export const MOCK_SUPPLIERS = {
  content: [
    { id: 1, name: 'AutoParts Co', contactPerson: 'John Smith', email: 'john@autoparts.com', phone: '+1-555-0101', address: '123 Industrial Ave', city: 'Detroit', state: 'MI', country: 'USA', rating: 4.5, active: true, createdAt: '2024-01-01T09:00:00' },
    { id: 2, name: 'BrakeMaster Ltd', contactPerson: 'Sarah Johnson', email: 'sarah@brakemaster.com', phone: '+1-555-0102', address: '456 Commerce St', city: 'Chicago', state: 'IL', country: 'USA', rating: 4.2, active: true, createdAt: '2024-01-02T09:00:00' },
    { id: 3, name: 'TransTech Inc', contactPerson: 'Mike Davis', email: 'mike@transtech.com', phone: '+1-555-0103', address: '789 Tech Park', city: 'Cleveland', state: 'OH', country: 'USA', rating: 3.8, active: true, createdAt: '2024-01-03T09:00:00' },
    { id: 4, name: 'ElectroParts', contactPerson: 'Lisa Chen', email: 'lisa@electroparts.com', phone: '+1-555-0104', address: '321 Silicon Blvd', city: 'San Jose', state: 'CA', country: 'USA', rating: 4.7, active: true, createdAt: '2024-01-04T09:00:00' },
    { id: 5, name: 'CoolSystems Ltd', contactPerson: 'Tom Wilson', email: 'tom@coolsystems.com', phone: '+1-555-0105', address: '654 Cooling Way', city: 'Houston', state: 'TX', country: 'USA', rating: 4.0, active: false, createdAt: '2024-01-05T09:00:00' },
    { id: 6, name: 'SuspensionPro', contactPerson: 'Anna Brown', email: 'anna@suspensionpro.com', phone: '+1-555-0106', address: '987 Springs Rd', city: 'Columbus', state: 'OH', country: 'USA', rating: 4.3, active: true, createdAt: '2024-01-06T09:00:00' },
  ],
  totalElements: 6,
  totalPages: 1,
  number: 0,
  size: 10,
};

export const MOCK_METRICS = {
  totalParts: 10,
  lowStockParts: 3,
  totalOrders: 6,
  pendingOrders: 1,
  totalSuppliers: 5,
  totalInventoryValue: 22413.50,
  monthlyOrdersData: [
    { month: 'Sep', orders: 8 },
    { month: 'Oct', orders: 14 },
    { month: 'Nov', orders: 11 },
    { month: 'Dec', orders: 18 },
    { month: 'Jan', orders: 22 },
    { month: 'Feb', orders: 6 },
  ],
  stockDistribution: [
    { name: 'In Stock', value: 7 },
    { name: 'Low Stock', value: 2 },
    { name: 'Out of Stock', value: 1 },
  ],
};

export const MOCK_INVENTORY_REPORT = {
  generatedAt: new Date().toISOString(),
  totalParts: 10,
  totalInventoryValue: 22413.50,
  lowStockItems: 3,
  parts: MOCK_PARTS.content,
};

export const MOCK_SALES_REPORT = {
  generatedAt: new Date().toISOString(),
  totalOrders: 6,
  totalRevenue: 9867.00,
  orders: MOCK_ORDERS.content,
};

export const MOCK_SUPPLIER_REPORT = {
  generatedAt: new Date().toISOString(),
  totalSuppliers: 6,
  activeSuppliers: 5,
  suppliers: MOCK_SUPPLIERS.content,
};

export const MOCK_LOW_STOCK = MOCK_PARTS.content.filter(
  p => p.quantity <= p.minStockLevel
);
