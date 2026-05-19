import api from '../../api/axios';

export const fetchCategoriesApi = () => api.get('/category');
export const createCategoryApi = (data) => api.post('/category', data);
export const updateCategoryApi = (id, data) => api.put(`/category/${id}`, data);
export const deleteCategoryApi = (id) => api.delete(`/category/${id}`);
export const toggleCategoryStatusApi = (id) =>
  api.patch(`/category/${id}/toggle-active`);
