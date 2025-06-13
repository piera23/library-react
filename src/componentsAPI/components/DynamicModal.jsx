// components/DynamicModal.js
import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const DynamicModal = ({
  isOpen,
  onClose,
  title,
  size = 'modal-lg',
  apiEndpoint,
  itemId = null,
  fields = [],
  method = 'POST',
  onSuccess,
  onError,
  footerActions = [],
  loadingComponent = null,
  children
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);

  // Carica i dati se è in modalità edit (itemId presente)
  useEffect(() => {
    if (isOpen && itemId && !initialLoad) {
      loadItemData();
    } else if (isOpen && !itemId) {
      // Reset form per nuovo elemento
      setFormData(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {})
      );
      setInitialLoad(true);
    }
  }, [isOpen, itemId]);

  const loadItemData = async () => {
    try {
      setLoading(true);
      const api = new ApiService();
      const data = await api.get(`${apiEndpoint}/${itemId}`);
      setFormData(data);
      setInitialLoad(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const api = new ApiService();
      let response;
      
      if (itemId) {
        // Update existing item
        response = await api.put(`${apiEndpoint}/${itemId}`, formData);
      } else {
        // Create new item
        response = await api[method.toLowerCase()](apiEndpoint, formData);
      }
      
      setSuccess(true);
      if (onSuccess) {
        onSuccess(response);
      }
      
      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 1500);
      
    } catch (err) {
      setError(err.message);
      if (onError) {
        onError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({});
    setError(null);
    setSuccess(false);
    setInitialLoad(false);
    onClose();
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <div key={field.name} className="mb-3">
            <label htmlFor={field.name} className="form-label">{field.label}</label>
            <input
              type={field.type}
              className="form-control"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              disabled={loading || field.disabled}
            />
            {field.helper && <div className="form-text">{field.helper}</div>}
          </div>
        );
        
      case 'textarea':
        return (
          <div key={field.name} className="mb-3">
            <label htmlFor={field.name} className="form-label">{field.label}</label>
            <textarea
              className="form-control"
              id={field.name}
              name={field.name}
              rows={field.rows || 3}
              value={formData[field.name] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              disabled={loading || field.disabled}
            />
          </div>
        );
        
      case 'select':
        return (
          <div key={field.name} className="mb-3">
            <label htmlFor={field.name} className="form-label">{field.label}</label>
            <select
              className="form-select"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              disabled={loading || field.disabled}
            >
              <option value="">Seleziona...</option>
              {field.options?.map((option, idx) => (
                <option key={idx} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        );
        
      case 'checkbox':
        return (
          <div key={field.name} className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={field.name}
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleChange}
              disabled={loading || field.disabled}
            />
            <label className="form-check-label" htmlFor={field.name}>
              {field.label}
            </label>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className={`modal-dialog ${size}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              disabled={loading}
            ></button>
          </div>
          
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show">
                {error}
                <button type="button" className="btn-close" onClick={() => setError(null)}></button>
              </div>
            )}
            
            {success && (
              <div className="alert alert-success">
                Operazione completata con successo!
              </div>
            )}
            
            {loading && !initialLoad && loadingComponent && loadingComponent}
            
            {loading && !initialLoad && !loadingComponent && (
              <div className="text-center p-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Caricamento...</span>
                </div>
              </div>
            )}
            
            {initialLoad && (
              <>
                {children}
                {fields.length > 0 && (
                  <form onSubmit={handleSubmit}>
                    {fields.map(field => renderField(field))}
                  </form>
                )}
              </>
            )}
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleClose}
              disabled={loading}
            >
              Annulla
            </button>
            
            {fields.length > 0 && (
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {itemId ? 'Aggiornamento...' : 'Creazione...'}
                  </>
                ) : (
                  itemId ? 'Aggiorna' : 'Crea'
                )}
              </button>
            )}
            
            {footerActions.map((action, index) => (
              <button
                key={index}
                type="button"
                className={action.className || 'btn btn-primary'}
                onClick={() => action.onClick(formData)}
                disabled={loading || action.disabled}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;