import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import supplierService from '../../services/supplierService';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { usePagination } from '../../hooks/usePagination';
import './SupplierList.css';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const pagination = usePagination();

  useEffect(() => {
    loadSuppliers();
  }, [pagination.page, pagination.pageSize]);

  const loadSuppliers = async () => {
    setIsLoading(true);
    const result = await supplierService.getAllSuppliers(
      pagination.page,
      pagination.pageSize
    );
    if (result.success) {
      setSuppliers(result.data.content || []);
      pagination.updatePaginationFromResponse(result.data);
    }
    setIsLoading(false);
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      loadSuppliers();
      return;
    }

    setIsLoading(true);
    const result = await supplierService.searchSuppliers(query);
    if (result.success) {
      setSuppliers(result.data || []);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setIsLoading(true);
      const result = await supplierService.deleteSupplier(id);
      if (result.success) {
        toast.success('Supplier deleted successfully');
        loadSuppliers();
      } else {
        toast.error(result.message || 'Failed to delete supplier');
      }
      setIsLoading(false);
    }
  };

  if (isLoading && suppliers.length === 0) {
    return <Loader fullScreen size="lg" />;
  }

  return (
    <div className="suppliers-page">
      <div className="page-header">
        <div>
          <h1>Suppliers</h1>
          <p>Manage your suppliers and vendors</p>
        </div>
        <Link to="/suppliers/add" className="btn btn-primary">
          <Plus size={18} /> Add Supplier
        </Link>
      </div>

      <div className="suppliers-container">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search suppliers by name, email, or contact..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {isLoading && suppliers.length > 0 && <Loader size="md" />}

        {suppliers.length === 0 ? (
          <div className="empty-state">
            <p>No suppliers found</p>
            <Link to="/suppliers/add" className="btn btn-primary">
              Add your first supplier
            </Link>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="suppliers-table">
                <thead>
                  <tr>
                    <th>Supplier Name</th>
                    <th>Contact Person</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                      <td className="supplier-name">{supplier.name}</td>
                      <td>{supplier.contactPerson}</td>
                      <td className="email">{supplier.email}</td>
                      <td>{supplier.phone}</td>
                      <td>{supplier.city}</td>
                      <td className="actions">
                        <Link
                          to={`/suppliers/edit/${supplier.id}`}
                          className="btn-icon edit"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDelete(supplier.id)}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              pageSize={pagination.pageSize}
              totalElements={pagination.totalElements}
              onPageChange={pagination.goToPage}
              onPageSizeChange={pagination.changePageSize}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SupplierList;
