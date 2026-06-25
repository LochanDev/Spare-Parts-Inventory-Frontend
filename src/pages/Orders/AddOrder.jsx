import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import orderService from '../../services/orderService';
import { ORDER_STATUS } from '../../utils/constants';
import './OrderForm.css';

const AddOrder = () => {
  const [formData, setFormData] = useState({
    supplierId: '',
    orderDate: new Date().toISOString().split('T')[0],
    totalAmount: 0,
    status: ORDER_STATUS.PENDING,
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.supplierId) {
      toast.error('Please select a supplier');
      return;
    }

    setIsLoading(true);
    const result = await orderService.createOrder(formData);

    if (result.success) {
      toast.success('Order created successfully');
      navigate('/orders');
    } else {
      toast.error(result.message || 'Failed to create order');
    }
    setIsLoading(false);
  };

  return (
    <div className="order-form-page">
      <div className="form-header">
        <Link to="/orders" className="back-link">← Back</Link>
        <h1>Create New Order</h1>
      </div>

      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-section">
          <h2>Order Information</h2>

          <div className="form-group">
            <label htmlFor="supplierId">Supplier *</label>
            <select
              id="supplierId"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
              required
            >
              <option value="">Select a supplier</option>
              <option value="1">Supplier 1</option>
              <option value="2">Supplier 2</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="orderDate">Order Date</label>
              <input
                type="date"
                id="orderDate"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value={ORDER_STATUS.PENDING}>Pending</option>
                <option value={ORDER_STATUS.PROCESSING}>Processing</option>
                <option value={ORDER_STATUS.SHIPPED}>Shipped</option>
                <option value={ORDER_STATUS.DELIVERED}>Delivered</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="totalAmount">Total Amount ($)</label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter additional order notes"
              rows="4"
            />
          </div>
        </div>

        <div className="form-actions">
          <Link to="/orders" className="btn btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
