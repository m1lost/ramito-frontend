import api from '../../api/axios';

export const fetchPaymentMethodApi = () => api.get('/payment-method');
export const createPaymentMethodApi = (data) =>
  api.post('/payment-method', data);
export const updatePaymentMethodApi = (id, data) =>
  api.put(`/payment-method/${id}`, data);
export const deletePaymentMethodApi = (id) =>
  api.delete(`/payment-method/${id}`);
export const togglePaymentMethodStatusApi = (id) =>
  api.patch(`/payment-method/${id}/toggle-active`);
