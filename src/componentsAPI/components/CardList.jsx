// components/CardList.js
import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const CardList = ({ 
  apiEndpoint,
  filters = {},
  cardsPerPage = 6,
  renderCard
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const api = new ApiService();
        const params = {
          ...filters,
          page: currentPage,
          limit: cardsPerPage
        };
        const response = await api.get(`${apiEndpoint}?${new URLSearchParams(params)}`);
        
        setItems(response.data || response);
        setTotalPages(response.totalPages || Math.ceil(response.total / cardsPerPage) || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [apiEndpoint, filters, currentPage, cardsPerPage]);

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Errore nel caricamento: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        {items.map((item, index) => (
          <div key={item.id || index} className="col-md-4 mb-4">
            {renderCard(item)}
          </div>
        ))}
      </div>
      
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

export default CardList;