// context/ApiContext.js
import React, { createContext, useContext } from 'react';
import UserService from '../services/UserService';
import ProductService from '../services/ProductService';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const userService = new UserService();
  const productService = new ProductService();

  return (
    <ApiContext.Provider value={{ userService, productService }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiServices = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiServices deve essere usato dentro ApiProvider');
  }
  return context;
};