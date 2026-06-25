import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import orderService from '../../services/orderService';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { formatDate, formatCurrency, getStatusColor } from '../../utils/helpers';
import { usePagination } from '../../hooks/usePagination';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pagination = usePagination();

  useEffect(() => {
    loadOrders();
  }, [pagination.page, pagination.pageSize]);

  const loadOrders = async () => {
    setIsLoading(true);
    const result = await orderService.getAllOrders(
      pagination.page,
      pagination.pageSize
    );
    if (result.success) {
      setOrders(result.data.content || []);
      pagination.updatePaginationFromResponse(result.data);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setIsLoading(true);
      const result = await orderService.deleteOrder(id);
      if (result.success) {
        toast.success('Order deleted successfully');
        loadOrders();
      } else {
        toast.error(result.message || 'Failed to delete order');
      }
      setIsLoading(false);
    }
  };

  if (isLoading && orders.length === 0) {
    return <Loader fullScreen size="lg" />;
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage your purchase orders</p>
        </div>
        <Link to="/orders/add" className="btn btn-primary">
          <Plus size={18} /> New Order
        </Link>
      </div>

      <div className="orders-container">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search orders..."
          />
        </div>

        {isLoading && orders.length > 0 && <Loader size="md" />}

        {orders.length === 0 ? (
          <div className="empty-state">
            <p>No orders found</p>
            <Link to="/orders/add" className="btn btn-primary">
              Create your first order
            </Link>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Supplier</th>
                    <th>Date</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">#{order.id}</td>
                      <td>{order.supplierName}</td>
                      <td>{formatDate(order.orderDate)}</td>
                      <td className="amount">{formatCurrency(order.totalAmount)}</td>
                      <td>
                        <span className={`badge badge-${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="actions">
                        <Link
                          to={`/orders/${order.id}`}
                          className="btn-icon edit"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDelete(order.id)}
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

export default OrderList;
