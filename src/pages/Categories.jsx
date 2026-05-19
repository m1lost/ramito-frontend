import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus
} from '../features/categories/categoriesSlice';

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.categories.list);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const submit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateCategory({ id: editing, data: { name } }));
      setEditing(null);
    } else {
      dispatch(createCategory({ name }));
    }
    setName('');
  };

  return (
    <div>
      <h3>Categories</h3>
      <form onSubmit={submit} className="mb-3">
        <div className="input-group">
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            required
          />
          <button className="btn btn-primary">
            {editing ? 'Update' : 'Create'}
          </button>
        </div>
      </form>

      <hr />
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.name}</td>
              <td>
                <button
                  className={`btn btn-sm me-2 ${
                    c.isActive ? 'btn-success' : 'btn-danger'
                  }`}
                  onClick={() => dispatch(toggleCategoryStatus(c.id))}
                >
                  {c.isActive ? 'Active' : 'Inactive'}
                </button>
              </td>

              <td className="text-end">
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => {
                    setEditing(c.id);
                    setName(c.name);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (window.confirm('Delete category?')) {
                      dispatch(deleteCategory(c.id));
                    }
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
