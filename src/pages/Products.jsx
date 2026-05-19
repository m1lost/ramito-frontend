import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus
} from '../features/products/productsSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((s) => s.products.list);
  const categories = useSelector((s) => s.categories.list);
  const [form, setForm] = useState({
    name: '',
    categoryId: '',
    price: '',
    stock: '',
    description: '',
    image: null
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFile = (e) =>
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));

  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('categoryId', form.categoryId);
    fd.append('price', form.price);
    fd.append('stock', form.stock);
    fd.append('description', form.description);
    if (form.image) fd.append('image', form.image);

    if (editing) {
      dispatch(updateProduct({ id: editing, formData: fd }));
      setEditing(null);
    } else {
      dispatch(createProduct(fd));
    }
    setForm({
      name: '',
      categoryId: '',
      price: '',
      stock: '',
      description: '',
      image: null
    });
  };

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({
      name: p.name,
      categoryId: p.categoryId,
      price: p.price,
      stock: p.stock,
      description: p.description,
      image: null
    });
  };

  const apiBase = import.meta.env.VITE_API_URL.replace('/api', '');

  return (
    <div>
      <h3>Products</h3>
      <form onSubmit={submit} className="mb-3">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Product name"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
              }
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={form.categoryId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  categoryId: e.target.value
                }))
              }
              required
            >
              <option value="">Select category</option>

              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Price</label>
            <input
              className="form-control"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  price: e.target.value
                }))
              }
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Stock</label>
            <input
              className="form-control"
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  stock: e.target.value
                }))
              }
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Picture</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFile}
              accept="image/*"
            />
          </div>

          <div className="col-md-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Description"
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: e.target.value
                }))
              }
              required
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary">
              {editing ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>

      <hr />

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p.id}>
            <div className="card">
              {p.image && (
                <img
                  src={`${apiBase}${p.image}`}
                  className="card-img-top"
                  alt={p.name}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>{' '}
                <p className="card-text">{p.Category?.name}</p>
                <p className="card-text bold">Rp. {p.price.toLocaleString()}</p>
                <p className="card-text">Stock: {p.stock}</p>
                <p className="card-text">{p.description}</p>
              </div>

              <td className="text-end p-2">
                <button
                  className={`btn btn-sm me-2 ${
                    p.isActive ? 'btn-success' : 'btn-danger'
                  }`}
                  onClick={() => dispatch(toggleProductStatus(p.id))}
                >
                  {p.isActive ? 'Active' : 'Inactive'}
                </button>

                <button
                  className="btn btn-sm btn-secondary me-2"
                  onClick={() => startEdit(p)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (confirm('Delete product?'))
                      dispatch(deleteProduct(p.id));
                  }}
                >
                  Delete
                </button>
              </td>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
