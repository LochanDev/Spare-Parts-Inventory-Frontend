import React, { useState, useEffect } from 'react';
import { Download, FileText, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import reportService from '../../services/reportService';
import Loader from '../../components/Loader/Loader';
import { exportToCSV, exportToExcel, exportToPDF } from '../../utils/exportUtils';
import './Reports.css';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    loadReport(activeTab);
  }, [activeTab]);

  const loadReport = async (reportType) => {
    setIsLoading(true);
    let result;

    switch (reportType) {
      case 'inventory':
        result = await reportService.getInventoryReport();
        break;
      case 'sales':
        result = await reportService.getSalesReport();
        break;
      case 'suppliers':
        result = await reportService.getSupplierReport();
        break;
      case 'orders':
        result = await reportService.getOrderReport();
        break;
      default:
        result = { success: false };
    }

    if (result.success) {
      setReportData(result.data);
    } else {
      toast.error('Failed to load report');
    }
    setIsLoading(false);
  };

  const handleExport = async (format) => {
    if (!reportData) {
      toast.error('No data to export');
      return;
    }

    try {
      const fileName = `${activeTab}-report`;
      
      if (format === 'csv') {
        exportToCSV(reportData, fileName);
      } else if (format === 'excel') {
        exportToExcel(reportData, 'Report', fileName);
      } else if (format === 'pdf') {
        const columns = Object.keys(reportData[0] || {}).map((key) => ({
          key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
        }));
        exportToPDF(columns, reportData, fileName);
      }
      toast.success(`Report exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error('Export failed');
    }
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h1>Reports</h1>
        <p>Generate and export inventory reports</p>
      </div>

      <div className="reports-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <BarChart3 size={18} /> Inventory
          </button>
          <button
            className={`tab ${activeTab === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveTab('sales')}
          >
            <BarChart3 size={18} /> Sales
          </button>
          <button
            className={`tab ${activeTab === 'suppliers' ? 'active' : ''}`}
            onClick={() => setActiveTab('suppliers')}
          >
            <BarChart3 size={18} /> Suppliers
          </button>
          <button
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <BarChart3 size={18} /> Orders
          </button>
        </div>

        <div className="reports-content">
          {isLoading ? (
            <Loader fullScreen size="lg" />
          ) : reportData && reportData.length > 0 ? (
            <>
              <div className="export-buttons">
                <button
                  className="btn btn-export"
                  onClick={() => handleExport('csv')}
                >
                  <Download size={18} /> Export CSV
                </button>
                <button
                  className="btn btn-export"
                  onClick={() => handleExport('excel')}
                >
                  <Download size={18} /> Export Excel
                </button>
                <button
                  className="btn btn-export"
                  onClick={() => handleExport('pdf')}
                >
                  <Download size={18} /> Export PDF
                </button>
              </div>

              <div className="table-responsive">
                <table className="reports-table">
                  <thead>
                    <tr>
                      {Object.keys(reportData[0] || {}).map((key) => (
                        <th key={key}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, i) => (
                          <td key={i}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <FileText size={48} />
              <p>No data available for this report</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
