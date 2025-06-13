// components/DynamicTable.js
import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const DynamicTable = ({
  apiEndpoint,
  columns,
  searchable = true,
  sortable = true,
  itemsPerPage = 10,
  actions = [],
  filters = {},
  selectable = false,
  onSelectionChange,
  className = "table table-striped"
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedItems, setSelectedItems] = useState(new Set());

  const fetchData = async () => {
    try {
      setLoading(true);
      const api = new ApiService();
      const params = {
        ...filters,
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction
      };
      
      const response = await api.get(`${apiEndpoint}?${new URLSearchParams(params)}`);
      setData(response.data || response);
      setTotalPages(response.totalPages || Math.ceil(response.total / itemsPerPage) || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiEndpoint, currentPage, itemsPerPage, searchTerm, sortConfig, filters]);

  const handleSort = (columnKey) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key: columnKey,
      direction: prev.key === columnKey && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(new Set(data.map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (itemId, checked) => {
    const newSelection = new Set(selectedItems);
    if (checked) {
      newSelection.add(itemId);
    } else {
      newSelection.delete(itemId);
    }
    setSelectedItems(newSelection);
    
    if (onSelectionChange) {
      onSelectionChange(Array.from(newSelection));
    }
  };

  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item[column.key], item);
    }
    
    if (column.type === 'date') {
      return new Date(item[column.key]).toLocaleDateString();
    }
    
    if (column.type === 'currency') {
      return `€${parseFloat(item[column.key]).toFixed(2)}`;
    }
    
    if (column.type === 'badge') {
      const badgeClass = column.badgeClass ? column.badgeClass(item[column.key]) : 'bg-primary';
      return <span className={`badge ${badgeClass}`}>{item[column.key]}</span>;
    }
    
    return item[column.key];
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        Errore nel caricamento: {error}
        <button className="btn btn-sm btn-outline-danger ms-2" onClick={fetchData}>
          Riprova
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Barra di ricerca */}
      {searchable && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Cerca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Azioni bulk */}
      {selectable && selectedItems.size > 0 && (
        <div className="mb-3">
          <div className="alert alert-info">
            {selectedItems.size} elementi selezionati
            {actions.filter(action => action.bulk).map((action, index) => (
              <button
                key={index}
                className={`btn btn-sm ${action.className || 'btn-primary'} ms-2`}
                onClick={() => action.onClick(Array.from(selectedItems))}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tabella */}
      <div className="table-responsive">
        <table className={className}>
          <thead>
            <tr>
              {selectable && (
                <th>
                  <input
                    type="checkbox"
                    checked={data.length > 0 && selectedItems.size === data.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  style={{ cursor: sortable ? 'pointer' : 'default' }}
                >
                  {column.label}
                  {sortable && sortConfig.key === column.key && (
                    <span className="ms-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
              {actions.filter(action => !action.bulk).length > 0 && <th>Azioni</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {selectable && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key}>
                    {renderCell(item, column)}
                  </td>
                ))}
                {actions.filter(action => !action.bulk).length > 0 && (
                  <td>
                    {actions.filter(action => !action.bulk).map((action, index) => (
                      <button
                        key={index}
                        className={`btn btn-sm ${action.className || 'btn-primary'} me-1`}
                        onClick={() => action.onClick(item)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginazione */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Precedente
              </button>
            </li>
            
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Successivo
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default DynamicTable;