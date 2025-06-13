// components/DynamicFilter.js
import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const DynamicFilter = ({
  filters = [],
  onFilterChange,
  onReset,
  initialValues = {},
  layout = 'horizontal', // 'horizontal' | 'vertical' | 'sidebar'
  showResetButton = true,
  showApplyButton = false,
  autoApply = true,
  className = ''
}) => {
  const [filterValues, setFilterValues] = useState(initialValues);
  const [optionsData, setOptionsData] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    // Carica le opzioni per i filtri che richiedono dati da API
    filters.forEach(filter => {
      if (filter.optionsEndpoint) {
        loadFilterOptions(filter);
      }
    });
  }, [filters]);

  useEffect(() => {
    if (autoApply && onFilterChange) {
      onFilterChange(filterValues);
    }
  }, [filterValues, autoApply, onFilterChange]);

  const loadFilterOptions = async (filter) => {
    try {
      setLoading(prev => ({ ...prev, [filter.name]: true }));
      const api = new ApiService();
      const data = await api.get(filter.optionsEndpoint);
      setOptionsData(prev => ({ 
        ...prev, 
        [filter.name]: filter.optionsExtractor ? filter.optionsExtractor(data) : data 
      }));
    } catch (error) {
      console.error(`Errore caricamento opzioni per ${filter.name}:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [filter.name]: false }));
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilterValues(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleReset = () => {
    setFilterValues(initialValues);
    if (onReset) {
      onReset();
    }
    if (autoApply && onFilterChange) {
      onFilterChange(initialValues);
    }
  };

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange(filterValues);
    }
  };

  const renderFilter = (filter) => {
    const value = filterValues[filter.name] || '';
    const options = optionsData[filter.name] || filter.options || [];
    const isLoading = loading[filter.name];

    switch (filter.type) {
      case 'text':
        return (
          <div key={filter.name} className={getFilterClassName(filter)}>
            <label className="form-label">{filter.label}</label>
            <input
              type="text"
              className="form-control"
              placeholder={filter.placeholder}
              value={value}
              onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            />
          </div>
        );

      case 'select':
        return (
          <div key={filter.name} className={getFilterClassName(filter)}>
            <label className="form-label">{filter.label}</label>
            <select
              className="form-select"
              value={value}
              onChange={(e) => handleFilterChange(filter.name, e.target.value)}
              disabled={isLoading}
            >
              <option value="">Tutti</option>
              {options.map((option, index) => (
                <option key={index} value={option.value || option}>
                  {option.label || option}
                </option>
              ))}
            </select>
            {isLoading && (
              <div className="spinner-border spinner-border-sm mt-1" role="status">
                <span className="visually-hidden">Caricamento...</span>
              </div>
            )}
          </div>
        );

      case 'multiselect':
        return (
          <div key={filter.name} className={getFilterClassName(filter)}>
            <label className="form-label">{filter.label}</label>
            <select
              className="form-select"
              multiple
              value={Array.isArray(value) ? value : []}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                handleFilterChange(filter.name, selected);
              }}
              disabled={isLoading}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value || option}>
                  {option.label || option}
                </option>
              ))}
            </select>
          </div>
        );

      case 'date':
        return (
          <div key={filter.name} className={getFilterClassName(filter)}>
            <label className="form-label">{filter.label}</label>
            <input
              type="date"
              className="form-control"
              value={value}
              onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            />
          </div>
        );

      case 'daterange':
        return (
          <div key={filter.name} className={getFilterClassName(filter)}>
            <label className="form-label">{filter.label}</label>
            <div className="row">
              <div className="col">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Data inizio"
                  value={value.start || ''}
                  onChange={(e) => handleFilterChange(filter.name, { ...value, start: e.target.value })}
                />
              </div>
              <div className="col">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Data fine"
                  value={value.end || ''}
                  onChange={(e) => handleFilterChange(filter.name, { ...value, end: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 'number':
        return (
          <div key={filter.name} className={getFilterClassName(filter)}>
            <label className="form-label">{filter.label}</label>
            <input
              type="number"
              className="form-control"
              placeholder={filter.placeholder}
              value={value}
              min={filter.min}
              max={filter.max}
              step={filter.step}
              onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            />
          </div>
        );

      case 'range':
        return (
          <div key={filter.name} className={getFilterClassName(filter)}>
            <label className="form-label">{filter.label}</label>
            <div className="row">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  value={value.min || ''}
                  onChange={(e) => handleFilterChange(filter.name, { ...value, min: e.target.value })}
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  value={value.max || ''}
                  onChange={(e) => handleFilterChange(filter.name, { ...value, max: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div key={filter.name} className={getFilterClassName(filter)}>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={filter.name}
                checked={value || false}
                onChange={(e) => handleFilterChange(filter.name, e.target.checked)}
              />
              <label className="form-check-label" htmlFor={filter.name}>
                {filter.label}
              </label>
            </div>
          </div>
        );

      case 'radio':
        return (
          <div key={filter.name} className={getFilterClassName(filter)}>
            <label className="form-label">{filter.label}</label>
            <div>
              {options.map((option, index) => (
                <div key={index} className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id={`${filter.name}_${index}`}
                    name={filter.name}
                    value={option.value || option}
                    checked={value === (option.value || option)}
                    onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={`${filter.name}_${index}`}>
                    {option.label || option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'search':
        return (
          <div key={filter.name} className={getFilterClassName(filter)}>
            <label className="form-label">{filter.label}</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder={filter.placeholder || "Cerca..."}
                value={value}
                onChange={(e) => handleFilterChange(filter.name, e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getFilterClassName = (filter) => {
    if (filter.className) return filter.className;
    
    switch (layout) {
      case 'vertical':
        return 'mb-3';
      case 'sidebar':
        return 'mb-3';
      case 'horizontal':
      default:
        return 'col-md-3 mb-3';
    }
  };

  const getContainerClassName = () => {
    let baseClass = `dynamic-filter ${className}`;
    
    switch (layout) {
      case 'vertical':
        return `${baseClass} d-flex flex-column`;
      case 'sidebar':
        return `${baseClass} sidebar-filter`;
      case 'horizontal':
      default:
        return `${baseClass} row align-items-end`;
    }
  };
}
export default DynamicFilter;