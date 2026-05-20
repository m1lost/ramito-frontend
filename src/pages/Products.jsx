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
import { fetchOrders, createOrder } from '../features/orders/ordersSlice';

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
    dispatch(fetchOrders());
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

  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.productId === product.id);

      if (exist) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          qty: 1
        }
      ];
    });
  };

  const increaseQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const [checkoutForm, setCheckoutForm] = useState({
    paymentMethod: 'COD',
    shippingFullName: '',
    shippingPhoneNumber: '',
    shippingAddress: '',
    shippingCity: '',
    shippingProvince: '',
    shippingPostalCode: '',
    notes: ''
  });

  const clearCart = () => {
    setCart([]);
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    const payload = {
      ...checkoutForm,
      items: cart.map((item) => ({
        productId: item.productId,
        qty: item.qty
      }))
    };

    try {
      await dispatch(createOrder(payload)).unwrap();
      console.log(payload);
      alert('Order created successfully');

      setCart([]);

      setCheckoutForm({
        paymentMethod: 'COD',
        shippingFullName: '',
        shippingPhoneNumber: '',
        shippingAddress: '',
        shippingCity: '',
        shippingProvince: '',
        shippingPostalCode: '',
        notes: ''
      });
    } catch (error) {
      console.log('FULL ERROR:', error);
      console.log('RESPONSE:', error.response);
      console.log('STATUS:', error.response?.status);
      console.log('DATA:', error.response?.data);
      console.log('PAYLOAD:', payload);

      alert(JSON.stringify(error.response?.data));

      console.error(error);
      alert(error.message || 'Failed to create order');
    }
  };
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

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

      {/* Shopping Cart */}
      <div className="card mt-4">
        <div className="card-body">
          <h4>Shopping Cart</h4>

          {cart.map((item) => (
            <>
              <React.Fragment key={item.productId}>
                <hr />

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <strong>{item.name}</strong>
                    <div>Rp {item.price.toLocaleString()}</div>
                  </div>

                  <div>
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => decreaseQty(item.productId)}
                    >
                      -
                    </button>

                    {item.qty}

                    <button
                      className="btn btn-sm btn-secondary ms-2"
                      onClick={() => increaseQty(item.productId)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </React.Fragment>
            </>
          ))}

          <hr />

          <div className="mb-3">
            <strong>Total: Rp {total.toLocaleString()}</strong>
          </div>

          <div className="row">
            <div className="col-md-6 mb-2">
              <input
                className="form-control"
                placeholder="Full Name"
                value={checkoutForm.shippingFullName}
                onChange={(e) =>
                  setCheckoutForm((prev) => ({
                    ...prev,
                    shippingFullName: e.target.value
                  }))
                }
              />
            </div>

            <div className="col-md-6 mb-2">
              <input
                className="form-control"
                placeholder="Phone Number"
                value={checkoutForm.shippingPhoneNumber}
                onChange={(e) =>
                  setCheckoutForm((prev) => ({
                    ...prev,
                    shippingPhoneNumber: e.target.value
                  }))
                }
              />
            </div>

            <div className="col-md-12 mb-2">
              <textarea
                className="form-control"
                rows={3}
                placeholder="Shipping Address"
                value={checkoutForm.shippingAddress}
                onChange={(e) =>
                  setCheckoutForm((prev) => ({
                    ...prev,
                    shippingAddress: e.target.value
                  }))
                }
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                placeholder="City"
                value={checkoutForm.shippingCity}
                onChange={(e) =>
                  setCheckoutForm((prev) => ({
                    ...prev,
                    shippingCity: e.target.value
                  }))
                }
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                placeholder="Province"
                value={checkoutForm.shippingProvince}
                onChange={(e) =>
                  setCheckoutForm((prev) => ({
                    ...prev,
                    shippingProvince: e.target.value
                  }))
                }
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                placeholder="Postal Code"
                value={checkoutForm.shippingPostalCode}
                onChange={(e) =>
                  setCheckoutForm((prev) => ({
                    ...prev,
                    shippingPostalCode: e.target.value
                  }))
                }
              />
            </div>

            <div className="col-md-12 mb-2">
              <textarea
                className="form-control"
                rows={2}
                placeholder="Notes"
                value={checkoutForm.notes}
                onChange={(e) =>
                  setCheckoutForm((prev) => ({
                    ...prev,
                    notes: e.target.value
                  }))
                }
              />
            </div>

            <div className="col-md-4 mb-3">
              <select
                className="form-select"
                value={checkoutForm.paymentMethod}
                onChange={(e) =>
                  setCheckoutForm((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value
                  }))
                }
              >
                <option value="COD">COD</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
              </select>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-danger"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            <button
              type="button"
              className="btn btn-success"
              onClick={submitOrder}
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
      {/* Shopping Cart */}

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
                  style={{
                    height: '220px',
                    objectFit: 'cover'
                  }}
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
                  className="btn btn-sm btn-danger me-2"
                  onClick={() => {
                    if (confirm('Delete product?'))
                      dispatch(deleteProduct(p.id));
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm  btn-primary"
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>
              </td>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
