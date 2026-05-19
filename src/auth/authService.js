import api from '../../api/axios';

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const verifyEmail = (token) => api.get(`/auth/verify-email?token=${token}`);
export const logout = () => Promise.resolve();

