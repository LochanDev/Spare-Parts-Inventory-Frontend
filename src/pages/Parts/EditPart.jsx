import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import partService from '../../services/partService';
import Loader from '../../components/Loader/Loader';
import { PART_STATUS } from '../../utils/constants';
import './PartForm.css';

const EditPart = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    category: '',
    quantity: 0,
    reorderLevel: 10,
    price: 0,
    status: PART_STATUS.ACTIVE,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPart();
  }, [id]);

  const loadPart = async () => {
    setIsLoading(true);
    const result = await partService.getPartById(id);
    if (result.success) {
      setFormData(result.data);
    } else {
      toast.error('Failed to load part');
      navigate('/parts');
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.sku) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    const result = await partService.updatePart(id, formData);

    if (result.success) {
      toast.success('Part updated successfully');
      navigate('/parts');
    } else {
      toast.error(result.message || 'Failed to update part');
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return <Loader fullScreen size="lg" />;
  }

  return (
    <div className="part-form-page">
      <div className="form-header">
        <Link to="/parts" className="back-link">← Back</Link>
        <h1>Edit Part</h1>
      </div>

      <form onSubmit={handleSubmit} className="part-form">
        <div className="form-section">
          <h2>Part Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Part Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Bearing Assembly"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="sku">SKU *</label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g., SKU-001"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter part description"
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Mechanical"
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
                <option value={PART_STATUS.ACTIVE}>Active</option>
                <option value={PART_STATUS.INACTIVE}>Inactive</option>
                <option value={PART_STATUS.DISCONTINUED}>Discontinued</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Inventory & Pricing</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantity in Stock</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                step="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reorderLevel">Reorder Level</label>
              <input
                type="number"
                id="reorderLevel"
                name="reorderLevel"
                value={formData.reorderLevel}
                onChange={handleChange}
                min="0"
                step="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Unit Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <Link to="/parts" className="btn btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPart;
