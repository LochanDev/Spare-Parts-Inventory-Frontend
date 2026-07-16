import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, Truck, AlertCircle } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import reportService from '../../services/reportService';
import { MOCK_METRICS } from '../../utils/mockData';
import Loader from '../../components/Loader/Loader';
import './Dashboard.css';

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
      } else {
        setMetrics(MOCK_METRICS);
      }
    } catch {
      setMetrics(MOCK_METRICS);
    }
    setIsLoading(false);
  };

  if (isLoading) return <Loader fullScreen size="lg" />;

  const data = metrics || MOCK_METRICS;

  const totalParts     = data.totalParts     ?? MOCK_METRICS.totalParts;
  const lowStockParts  = data.lowStockParts  ?? data.lowStockCount ?? MOCK_METRICS.lowStockParts;
  const totalOrders    = data.totalOrders    ?? MOCK_METRICS.totalOrders;
  const totalSuppliers = data.totalSuppliers ?? data.activeSuppliers ?? MOCK_METRICS.totalSuppliers;

  const hasRealMonthlyData = Array.isArray(data.monthlyOrdersData) &&
    data.monthlyOrdersData.some(m => m.orders > 0);
  const monthlyOrdersData = hasRealMonthlyData
    ? data.monthlyOrdersData
    : MOCK_METRICS.monthlyOrdersData;

  const hasRealStockData = Array.isArray(data.stockDistribution) &&
    data.stockDistribution.some(s => s.value > 0);
  const stockDistribution = hasRealStockData
    ? data.stockDistribution
    : MOCK_METRICS.stockDistribution;

  const usingMockCharts = !hasRealMonthlyData || !hasRealStockData;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your inventory management system</p>
        {usingMockCharts && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#fef3c7', color: '#92400e', fontSize: '12px',
            padding: '4px 10px', borderRadius: '20px', marginTop: '6px',
          }}>
            ⚠️ Charts showing sample data — add parts and orders to see real analytics
          </div>
        )}
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
          <h3>Monthly Orders {usingMockCharts && <span style={{ fontSize: '11px', color: '#9ca3af' }}>(sample)</span>}</h3>
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
          <h3>Stock Distribution {usingMockCharts && <span style={{ fontSize: '11px', color: '#9ca3af' }}>(sample)</span>}</h3>
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
