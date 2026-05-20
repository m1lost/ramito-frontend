import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, removeOrder } from '../features/orders/ordersSlice';

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((s) => s.order?.list || []);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <h3>Orders</h3>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Payment</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o, index) => (
            <tr key={o.id}>
              <td>{index + 1}</td>
              <td>{o.shippingFullName}</td>
              <td>{o.shippingPhoneNumber}</td>
              <td>{o.paymentMethod}</td>
              <td>{o.shippingAddress}</td>

              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => setSelectedOrder(o)}
                >
                  Detail
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (window.confirm('Delete order?')) {
                      dispatch(removeOrder(o.id));
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

      {selectedOrder && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Detail</h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => dispatch(clearSelectedOrder())}
                />
              </div>

              <div className="modal-body">
                <p>
                  <strong>Customer:</strong> {selectedOrder.shippingFullName}
                </p>

                <p>
                  <strong>Phone:</strong> {selectedOrder.shippingPhoneNumber}
                </p>

                <p>
                  <strong>Address:</strong> {selectedOrder.shippingAddress}
                </p>

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedOrder.OrderDetails?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.categoryName}</td>
                        <td>{item.productName}</td>
                        <td>Rp {item.productPrice.toLocaleString()}</td>
                        <td>{item.qty}</td>
                        <td>Rp {item.subtotal.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => dispatch(clearSelectedOrder())}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* last modal */}
    </div>
  );
}
