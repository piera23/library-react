// components/ExampleWithAPI.js
import React, { useState } from 'react';
import { ApiProvider, useApiServices } from '../context/ApiContext';
import { useFetch } from '../hooks/useApi';
import CardList from './CardList';
import DynamicForm from './DynamicForm';

const ExampleWithAPI = () => {
  const { productService } = useApiServices();
  const { data: products, loading, error, refetch } = useFetch(() => productService.getProducts());
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const productFields = [
    { name: 'name', label: 'Nome Prodotto', type: 'text', required: true },
    { name: 'description', label: 'Descrizione', type: 'textarea', required: true },
    { name: 'price', label: 'Prezzo', type: 'number', required: true },
    { 
      name: 'category', 
      label: 'Categoria', 
      type: 'select', 
      required: true,
      options: [
        { value: 'electronics', label: 'Elettronica' },
        { value: 'clothing', label: 'Abbigliamento' },
        { value: 'food', label: 'Alimentari' }
      ]
    }
  ];
  
  const handleProductCreated = (newProduct) => {
    setShowCreateModal(false);
    refetch(); // Ricarica la lista prodotti
  };
  
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestione Prodotti</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Aggiungi Prodotto
        </button>
      </div>
      
      {loading && (
        <div className="text-center p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger">
          Errore: {error}
          <button className="btn btn-sm btn-outline-danger ms-2" onClick={refetch}>
            Riprova
          </button>
        </div>
      )}
      
      {products && (
        <CardList 
          apiEndpoint="/products"
          renderCard={(product) => (
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="text-primary fw-bold">€{product.price}</p>
                <span className="badge bg-secondary">{product.category}</span>
              </div>
            </div>
          )}
        />
      )}
      
      {showCreateModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nuovo Prodotto</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <DynamicForm
                  fields={productFields}
                  apiEndpoint="/products"
                  method="POST"
                  onSuccess={handleProductCreated}
                  submitText="Crea Prodotto"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrapper component with provider
const ExampleWithAPIWrapper = () => (
  <ApiProvider>
    <ExampleWithAPI />
  </ApiProvider>
);

export default ExampleWithAPIWrapper;