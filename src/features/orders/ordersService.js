import api from '../../api/axios';

export const createOrderApi = (data) => api.post('/order', data);
export const fetchOrdersApi = () => api.get('/order');
export const deleteOrderApi = (id) => api.delete(`/order/${id}`);
export const deleteOrderItemApi = (id) => api.delete(`/order/${id}/items`);
