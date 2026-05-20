import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  removeUser,
  setUserRoles,
  toggleUserStatus
} from '../features/users/usersSlice';
import { fetchRoles } from '../features/roles/rolesSlice';
import { createUser } from '../features/users/usersSlice';

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users.list);
  const roles = useSelector((s) => s.roles.list);
  const [form, setForm] = useState({ email: '', password: '' });
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    await dispatch(createUser(form));
    alert('Registered. Check email for verification.');
    setForm({ email: '', password: '' });
    dispatch(fetchUsers());
  };

  const toggleRole = (userId, roleId) => {
    setSelectedRoles((prev) => {
      const arr = prev[userId]
        ? [...prev[userId]]
        : users.find((u) => u.id === userId)?.Roles?.map((r) => r.id) || [];
      if (arr.includes(roleId))
        return { ...prev, [userId]: arr.filter((r) => r !== roleId) };
      return { ...prev, [userId]: [...arr, roleId] };
    });
  };

  const saveRoles = (userId) => {
    const roleIds = selectedRoles[userId] || [];
    dispatch(setUserRoles({ id: userId, roleIds }));
  };

  return (
    <div>
      <h3>Users</h3>

      <div className="card mb-3 p-3">
        <h5>Create User</h5>
        <form onSubmit={handleCreate}>
          <div className="mb-2">
            <input
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button className="btn btn-primary">Register</button>
        </form>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>
                <button
                  className={`btn btn-sm me-2 ${
                    u.isActive ? 'btn-success' : 'btn-danger'
                  }`}
                  onClick={() => dispatch(toggleUserStatus(u.id))}
                >
                  {u.isActive ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td>{u.Roles?.map((r) => r.name).join(', ')}</td>
              <td>
                {roles.map((r) => (
                  <label className="me-2" key={r.id}>
                    <input
                      type="checkbox"
                      checked={(
                        selectedRoles[u.id] ||
                        u.Roles?.map((x) => x.id) ||
                        []
                      ).includes(r.id)}
                      onChange={() => toggleRole(u.id, r.id)}
                    />{' '}
                    {r.name}
                  </label>
                ))}
                <button
                  className="btn btn-sm btn-success ms-2"
                  onClick={() => saveRoles(u.id)}
                >
                  Save Roles
                </button>
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => {
                    if (confirm('Delete user?')) dispatch(removeUser(u.id));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
