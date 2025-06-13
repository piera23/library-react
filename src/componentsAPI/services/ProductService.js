// services/ProductService.js
import ApiService from './ApiService';

class ProductService extends ApiService {
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.get(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(id) {
    return this.get(`/products/${id}`);
  }

  async createProduct(productData) {
    return this.post('/products', productData);
  }

  async updateProduct(id, productData) {
    return this.put(`/products/${id}`, productData);
  }
}

export default ProductService;