import React, { useState, useEffect } from 'react';
import { BarChart3, Package, ShoppingCart, Truck, AlertCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import reportService from '../../services/reportService';
import Loader from '../../components/Loader/Loader';
import './Dashboard.css';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    const result = await reportService.getDashboardMetrics();
    if (result.success) {
      setMetrics(result.data);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader fullScreen size="lg" />;
  }

  const dashboardMetrics = metrics || {
    totalParts: 1250,
    lowStockParts: 45,
    totalOrders: 320,
    pendingOrders: 28,
    totalSuppliers: 85,
    monthlyOrdersData: [
      { month: 'Jan', orders: 40 },
      { month: 'Feb', orders: 30 },
      { month: 'Mar', orders: 45 },
      { month: 'Apr', orders: 50 },
      { month: 'May', orders: 48 },
      { month: 'Jun', orders: 52 },
    ],
    stockDistribution: [
      { name: 'In Stock', value: 800 },
      { name: 'Low Stock', value: 400 },
      { name: 'Out of Stock', value: 50 },
    ],
  };

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your inventory management system</p>
      </div>

      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon blue">
            <Package size={24} />
          </div>
          <div className="metric-content">
            <h3>Total Parts</h3>
            <p className="metric-value">{dashboardMetrics.totalParts}</p>
            <span className="metric-label">In inventory</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon warning">
            <AlertCircle size={24} />
          </div>
          <div className="metric-content">
            <h3>Low Stock</h3>
            <p className="metric-value">{dashboardMetrics.lowStockParts}</p>
            <span className="metric-label">Require ordering</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon green">
            <ShoppingCart size={24} />
          </div>
          <div className="metric-content">
            <h3>Total Orders</h3>
            <p className="metric-value">{dashboardMetrics.totalOrders}</p>
            <span className="metric-label">All time</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon orange">
            <Truck size={24} />
          </div>
          <div className="metric-content">
            <h3>Suppliers</h3>
            <p className="metric-value">{dashboardMetrics.totalSuppliers}</p>
            <span className="metric-label">Active suppliers</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardMetrics.monthlyOrdersData}>
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
                data={dashboardMetrics.stockDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dashboardMetrics.stockDistribution.map((entry, index) => (
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
