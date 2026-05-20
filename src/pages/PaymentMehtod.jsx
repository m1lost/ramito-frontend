import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPaymentMethod,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  togglePaymentMethodStatus
} from '../features/paymentMethod/paymentMethodSlice';

export default function PaymentMethod() {
  const dispatch = useDispatch();
  const paymentMethod = useSelector((s) => s.paymentMethods.list);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchPaymentMethod());
  }, [dispatch]);

  const submit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updatePaymentMethod({ id: editing, data: { name } }));
      setEditing(null);
    } else {
      dispatch(createPaymentMethod({ name }));
    }
    setName('');
  };

  return (
    <div>
      <h3>PaymentMethod</h3>
      <form onSubmit={submit} className="mb-3">
        <div className="input-group">
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Payment Method name"
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
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {paymentMethod.map((c, index) => (
            <tr key={c.id}>
              <td>{index + 1}</td>
              <td>{c.name}</td>
              <td className="text-center">
                <button
                  className={`btn btn-sm me-2 ${
                    c.isActive ? 'btn-success' : 'btn-danger'
                  }`}
                  onClick={() => dispatch(togglePaymentMethodStatus(c.id))}
                >
                  {c.isActive ? 'Active' : 'Inactive'}
                </button>
              </td>

              <td className="text-center">
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
                    if (window.confirm('Delete paymentMethod?')) {
                      dispatch(deletePaymentMethod(c.id));
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
