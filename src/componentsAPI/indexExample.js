// index.js - File di esportazione principale
// Servizi
export { default as ApiService } from './services/ApiService';
export { default as UserService } from './services/UserService';
export { default as ProductService } from './services/ProductService';

// Hooks
export { useApi, useFetch } from './hooks/useApi';

// Context
export { ApiProvider, useApiServices } from './context/ApiContext';

// Componenti
export { default as DynamicCard } from './components/DynamicCard';
export { default as CardList } from './components/CardList';
export { default as DynamicForm } from './components/DynamicForm';
export { default as ExampleWithAPI } from './components/ExampleWithAPI';