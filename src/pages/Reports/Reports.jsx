import React, { useState, useEffect } from 'react';
import { Download, FileText, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import reportService from '../../services/reportService';
import Loader from '../../components/Loader/Loader';
import './Reports.css';

// Extract the data array from the report response object
const extractRows = (data, reportType) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  switch (reportType) {
    case 'inventory': return Array.isArray(data.parts) ? data.parts : [];
    case 'sales':     return Array.isArray(data.orders) ? data.orders : [];
    case 'suppliers': return Array.isArray(data.suppliers) ? data.suppliers : [];
    case 'orders':    return Array.isArray(data.orders) ? data.orders : [];
    default:          return [];
  }
};

// Flatten an object row for table display
const flattenRow = (row) => {
  const flat = {};
  Object.entries(row).forEach(([k, v]) => {
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      Object.entries(v).forEach(([k2, v2]) => { flat[`${k}.${k2}`] = v2; });
    } else {
      flat[k] = v;
    }
  });
  return flat;
};

const exportCSV = (rows, filename) => {
  if (!rows.length) return;
  const flat = rows.map(flattenRow);
  const headers = Object.keys(flat[0]);
  const csv = [
    headers.join(','),
    ...flat.map(row => headers.map(h => `"${row[h] ?? ''}"`).join(',')),
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

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
      case 'inventory': result = await reportService.getInventoryReport(); break;
      case 'sales':     result = await reportService.getSalesReport();     break;
      case 'suppliers': result = await reportService.getSupplierReport();  break;
      case 'orders':    result = await reportService.getOrderReport();     break;
      default:          result = { success: false };
    }
    if (result.success) {
      setReportData(result.data);
    } else {
      toast.error('Failed to load report');
      setReportData(null);
    }
    setIsLoading(false);
  };

  const rows = extractRows(reportData, activeTab);
  const flatRows = rows.map(flattenRow);
  const columns = flatRows.length > 0 ? Object.keys(flatRows[0]) : [];

  const handleExport = () => {
    if (!flatRows.length) { toast.error('No data to export'); return; }
    exportCSV(flatRows, `${activeTab}-report`);
    toast.success('Report exported as CSV');
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h1>Reports</h1>
        <p>Generate and export inventory reports</p>
      </div>

      <div className="reports-container">
        <div className="tabs">
          {['inventory', 'sales', 'suppliers', 'orders'].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <BarChart3 size={18} />
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="reports-content">
          {isLoading ? (
            <Loader fullScreen size="lg" />
          ) : flatRows.length > 0 ? (
            <>
              <div className="export-buttons">
                <button className="btn btn-export" onClick={handleExport}>
                  <Download size={18} /> Export CSV
                </button>
              </div>

              <div className="table-responsive">
                <table className="reports-table">
                  <thead>
                    <tr>
                      {columns.map((col) => (
                        <th key={col}>
                          {col.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {flatRows.map((row, i) => (
                      <tr key={i}>
                        {columns.map((col) => (
                          <td key={col}>
                            {row[col] !== null && row[col] !== undefined
                              ? String(row[col])
                              : '—'}
                          </td>
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
