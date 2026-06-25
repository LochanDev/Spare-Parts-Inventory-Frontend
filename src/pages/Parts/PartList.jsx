import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import partService from '../../services/partService';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { usePagination } from '../../hooks/usePagination';
import './PartList.css';

const PartList = () => {
  const [parts, setParts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const pagination = usePagination();

  useEffect(() => {
    loadParts();
  }, [pagination.page, pagination.pageSize]);

  const loadParts = async () => {
    setIsLoading(true);
    const result = await partService.getAllParts(
      pagination.page,
      pagination.pageSize
    );
    if (result.success) {
      setParts(result.data.content || []);
      pagination.updatePaginationFromResponse(result.data);
    }
    setIsLoading(false);
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      loadParts();
      return;
    }

    setIsLoading(true);
    const result = await partService.searchParts(query);
    if (result.success) {
      setParts(result.data || []);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this part?')) {
      setIsLoading(true);
      const result = await partService.deletePart(id);
      if (result.success) {
        toast.success('Part deleted successfully');
        loadParts();
      } else {
        toast.error(result.message || 'Failed to delete part');
      }
      setIsLoading(false);
    }
  };

  if (isLoading && parts.length === 0) {
    return <Loader fullScreen size="lg" />;
  }

  return (
    <div className="parts-page">
      <div className="page-header">
        <div>
          <h1>Spare Parts</h1>
          <p>Manage your inventory of spare parts</p>
        </div>
        <Link to="/parts/add" className="btn btn-primary">
          <Plus size={18} /> Add Part
        </Link>
      </div>

      <div className="parts-container">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search parts by name, SKU, or part number..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {isLoading && parts.length > 0 && <Loader size="md" />}

        {parts.length === 0 ? (
          <div className="empty-state">
            <p>No parts found</p>
            <Link to="/parts/add" className="btn btn-primary">
              Add your first part
            </Link>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="parts-table">
                <thead>
                  <tr>
                    <th>Part Name</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parts.map((part) => (
                    <tr key={part.id}>
                      <td className="part-name">{part.name}</td>
                      <td className="sku">{part.sku}</td>
                      <td className="category">{part.category}</td>
                      <td className="quantity">
                        <span className={part.quantity < 10 ? 'low-stock' : ''}>
                          {part.quantity}
                        </span>
                      </td>
                      <td className="price">{formatCurrency(part.price)}</td>
                      <td>
                        <span className={`badge badge-${part.status.toLowerCase()}`}>
                          {part.status}
                        </span>
                      </td>
                      <td className="actions">
                        <Link
                          to={`/parts/edit/${part.id}`}
                          className="btn-icon edit"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDelete(part.id)}
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

export default PartList;
