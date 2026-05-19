import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole
} from '../features/roles/rolesSlice';

export default function Roles() {
  const dispatch = useDispatch();
  const roles = useSelector((s) => s.roles.list);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const submit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateRole({ id: editing, data: { name } }));
      setEditing(null);
    } else {
      dispatch(createRole({ name }));
    }
    setName('');
  };

  return (
    <div>
      <h3>Roles</h3>
      <form onSubmit={submit} className="mb-3">
        <div className="input-group">
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Role name"
            required
          />
          <button className="btn btn-primary">
            {editing ? 'Update' : 'Create'}
          </button>
        </div>
      </form>

      <ul className="list-group">
        {roles.map((r) => (
          <li
            key={r.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {r.name}
            <div>
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={() => {
                  setEditing(r.id);
                  setName(r.name);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  if (confirm('Delete role?')) dispatch(deleteRole(r.id));
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
