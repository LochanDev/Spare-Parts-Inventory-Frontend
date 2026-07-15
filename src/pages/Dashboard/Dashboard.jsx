import React, { useState, useEffect } from 'react';
import { BarChart3, Package, ShoppingCart, Truck, AlertCircle } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import reportService from '../../services/reportService';
import Loader from '../../components/Loader/Loader';
import './Dashboard.css';

const DEFAULT_MONTHLY = [
  { month: 'Jan', orders: 0 }, { month: 'Feb', orders: 0 },
  { month: 'Mar', orders: 0 }, { month: 'Apr', orders: 0 },
  { month: 'May', orders: 0 }, { month: 'Jun', orders: 0 },
];

const DEFAULT_STOCK = [
  { name: 'In Stock', value: 0 },
  { name: 'Low Stock', value: 0 },
  { name: 'Out of Stock', value: 0 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const result = await reportService.getDashboardMetrics();
      if (result.success) {
        setMetrics(result.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    }
    setIsLoading(false);
  };

  if (isLoading) return <Loader fullScreen size="lg" />;

  const totalParts        = metrics?.totalParts ?? 0;
  const lowStockParts     = metrics?.lowStockParts ?? metrics?.lowStockCount ?? 0;
  const totalOrders       = metrics?.totalOrders ?? 0;
  const totalSuppliers    = metrics?.totalSuppliers ?? metrics?.activeSuppliers ?? 0;
  const monthlyOrdersData = Array.isArray(metrics?.monthlyOrdersData) && metrics.monthlyOrdersData.length
                              ? metrics.monthlyOrdersData : DEFAULT_MONTHLY;
  const stockDistribution = Array.isArray(metrics?.stockDistribution) && metrics.stockDistribution.length
                              ? metrics.stockDistribution : DEFAULT_STOCK;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your inventory management system</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon blue"><Package size={24} /></div>
          <div className="metric-content">
            <h3>Total Parts</h3>
            <p className="metric-value">{totalParts}</p>
            <span className="metric-label">In inventory</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon warning"><AlertCircle size={24} /></div>
          <div className="metric-content">
            <h3>Low Stock</h3>
            <p className="metric-value">{lowStockParts}</p>
            <span className="metric-label">Require ordering</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon green"><ShoppingCart size={24} /></div>
          <div className="metric-content">
            <h3>Total Orders</h3>
            <p className="metric-value">{totalOrders}</p>
            <span className="metric-label">All time</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon orange"><Truck size={24} /></div>
          <div className="metric-content">
            <h3>Suppliers</h3>
            <p className="metric-value">{totalSuppliers}</p>
            <span className="metric-label">Active suppliers</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyOrdersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Stock Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                dataKey="value"
              >
                {stockDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
