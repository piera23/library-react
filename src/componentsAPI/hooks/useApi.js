// hooks/useApi.js
import { useState, useCallback, useEffect } from 'react';

// Hook per gestire le chiamate API con loading e error states
export const useApi = (apiCall) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Si è verificato un errore');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  return { data, loading, error, execute };
};

// Hook per il fetch automatico al mount del componente
export const useFetch = (apiCall, dependencies = []) => {
  const { data, loading, error, execute } = useApi(apiCall);

  useEffect(() => {
    execute();
  }, dependencies);

  return { data, loading, error, refetch: execute };
};