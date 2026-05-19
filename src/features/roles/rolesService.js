import api from '../../api/axios';

export const fetchRolesApi = () => api.get('/roles');
export const createRoleApi = (data) => api.post('/roles', data);
export const updateRoleApi = (id, data) => api.put(`/roles/${id}`, data);
export const deleteRoleApi = (id) => api.delete(`/roles/${id}`);
