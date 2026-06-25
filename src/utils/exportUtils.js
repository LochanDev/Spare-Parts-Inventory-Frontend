import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { formatDate } from './helpers';

export const exportToCSV = (data, fileName = 'export') => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}_${new Date().getTime()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (data, sheetName = 'Sheet1', fileName = 'export') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${fileName}_${new Date().getTime()}.xlsx`);
};

export const exportToPDF = (columns, data, fileName = 'export') => {
  const doc = new jsPDF();
  const tableData = data.map((row) =>
    columns.map((col) => {
      const value = row[col.key];
      if (col.format) {
        return col.format(value);
      }
      return value;
    })
  );

  const columnHeaders = columns.map((col) => col.label);

  doc.autoTable({
    head: [columnHeaders],
    body: tableData,
    margin: 10,
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
  });

  doc.save(`${fileName}_${formatDate(new Date())}.pdf`);
};

export const exportMultipleSheets = (sheetsData, fileName = 'export') => {
  const wb = XLSX.utils.book_new();
  
  sheetsData.forEach((sheet) => {
    const ws = XLSX.utils.json_to_sheet(sheet.data);
    XLSX.utils.book_append_sheet(wb, ws, sheet.name);
  });
  
  XLSX.writeFile(wb, `${fileName}_${new Date().getTime()}.xlsx`);
};

export const generateTableHTML = (columns, data) => {
  let html = '<table border="1" cellpadding="10"><thead><tr>';
  
  columns.forEach((col) => {
    html += `<th>${col.label}</th>`;
  });
  
  html += '</tr></thead><tbody>';
  
  data.forEach((row) => {
    html += '<tr>';
    columns.forEach((col) => {
      const value = row[col.key];
      const formattedValue = col.format ? col.format(value) : value;
      html += `<td>${formattedValue}</td>`;
    });
    html += '</tr>';
  });
  
  html += '</tbody></table>';
  return html;
};

export const printTable = (columns, data, title = '') => {
  const printWindow = window.open('', '', 'height=600,width=800');
  const html = `
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { text-align: center; color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          tr:nth-child(even) { background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${generateTableHTML(columns, data)}
      </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
};
