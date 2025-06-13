// components/DynamicForm.js
import React, { useState } from 'react';
import ApiService from '../services/ApiService';

const DynamicForm = ({ 
  fields,
  apiEndpoint,
  method = 'POST',
  onSuccess,
  onError,
  submitText = 'Invia',
  formTitle = null
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {})
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      const response = await api[method.toLowerCase()](apiEndpoint, formData);
      
      setSuccess(true);
      if (onSuccess) {
        onSuccess(response);
      }
      
      // Reset form
      setFormData(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {})
      );
    } catch (err) {
      setError(err.message);
      if (onError) {
        onError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <div key={field.name} className="form-group mb-3">
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              className="form-control"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              disabled={loading}
            />
            {field.helper && <small className="form-text">{field.helper}</small>}
          </div>
        );
        
      case 'textarea':
        return (
          <div key={field.name} className="form-group mb-3">
            <label htmlFor={field.name}>{field.label}</label>
            <textarea
              className="form-control"
              id={field.name}
              name={field.name}
              rows={field.rows || 3}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              disabled={loading}
            />
          </div>
        );
        
      case 'select':
        return (
          <div key={field.name} className="form-group mb-3">
            <label htmlFor={field.name}>{field.label}</label>
            <div className="select-wrapper">
              <select
                className="form-control"
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                disabled={loading}
              >
                <option value="">Seleziona...</option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div>
      {formTitle && <h3 className="mb-4">{formTitle}</h3>}
      
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}
      
      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Operazione completata con successo!
          <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
        </div>
      )}
      
      <div onSubmit={handleSubmit}>
        {fields.map(field => renderField(field))}
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Invio in corso...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>
    </div>
  );
};

export default DynamicForm;