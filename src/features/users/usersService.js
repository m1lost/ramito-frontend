import api from '../../api/axios';

export const fetchUsersApi = () => api.get('/user');
export const fetchUserApi = (id) => api.get(`/user/${id}`);
export const createUserApi = (data) => api.post('/auth/register', data);
export const updateUserApi = (id, data) => api.put(`/user/${id}`, data);
export const deleteUserApi = (id) => api.delete(`/user/${id}`);
export const setUserRolesApi = (id, roleIds) =>
  api.put(`/user/${id}/roles`, { roleIds });
export const getProfileApi = () => api.get('/users/me');
