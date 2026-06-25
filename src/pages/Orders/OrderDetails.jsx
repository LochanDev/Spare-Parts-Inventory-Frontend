import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import orderService from '../../services/orderService';
import Loader from '../../components/Loader/Loader';
import { formatDate, formatCurrency } from '../../utils/helpers';
import './OrderDetails.css';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrderDetails();
  }, [id]);

  const loadOrderDetails = async () => {
    setIsLoading(true);
    const result = await orderService.getOrderById(id);
    if (result.success) {
      setOrder(result.data);
    } else {
      toast.error('Failed to load order details');
      navigate('/orders');
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader fullScreen size="lg" />;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="order-details-page">
      <div className="details-header">
        <Link to="/orders" className="back-link">← Back</Link>
        <h1>Order #{order.id}</h1>
      </div>

      <div className="details-container">
        <div className="details-card">
          <h2>Order Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <label>Order Date</label>
              <p>{formatDate(order.orderDate)}</p>
            </div>
            <div className="detail-item">
              <label>Status</label>
              <p>
                <span className={`badge badge-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </p>
            </div>
            <div className="detail-item">
              <label>Supplier</label>
              <p>{order.supplierName}</p>
            </div>
            <div className="detail-item">
              <label>Total Amount</label>
              <p className="amount">{formatCurrency(order.totalAmount)}</p>
            </div>
          </div>
        </div>

        {order.notes && (
          <div className="details-card">
            <h2>Notes</h2>
            <p>{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
