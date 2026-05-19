import api from '../../api/axios';

export const fetchProductsApi = () => api.get('/product');
export const fetchProductApi = (id) => api.get(`/product/${id}`);
export const createProductApi = (formData) =>
  api.post('/product', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
export const updateProductApi = (id, formData) =>
  api.put(`/product/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
export const deleteProductApi = (id) => api.delete(`/product/${id}`);
export const toggleProductStatusApi = (id) =>
  api.patch(`/product/${id}/toggle-active`);
