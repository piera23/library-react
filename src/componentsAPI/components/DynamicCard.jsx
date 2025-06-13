// components/DynamicCard.js
import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

const DynamicCard = ({ 
  apiEndpoint,
  itemId,
  renderCard,
  loadingComponent = <div>Caricamento...</div>,
  errorComponent = <div>Errore nel caricamento</div>
}) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const api = new ApiService();
        const data = await api.get(`${apiEndpoint}/${itemId}`);
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchData();
    }
  }, [apiEndpoint, itemId]);

  if (loading) return loadingComponent;
  if (error) return errorComponent;
  if (!item) return null;

  return renderCard(item);
};

export default DynamicCard;