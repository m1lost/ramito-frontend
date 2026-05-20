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
            <th>Status</th>
            <th>Customer</th>
            <th>User Email</th>
            <th>Payment</th>
            <th>Total Price</th>
            <th>Total Quantity</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o, index) => {
            const totalPrice =
              o.OrderDetails?.reduce(
                (sum, item) => sum + Number(item.subtotal),
                0
              ) || 0;

            const totalQty =
              o.OrderDetails?.reduce((sum, item) => sum + item.qty, 0) || 0;

            return (
              <tr key={o.id}>
                <td>{index + 1}</td>
                <td>{o.status}</td>
                <td>{o.shippingFullName}</td>
                <td>{o.User?.email}</td>
                <td>{o.paymentMethod}</td>
                <td className="text-end">
                  Rp{' '}
                  {Number(totalPrice).toLocaleString('id-ID', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>

                <td className="text-end">
                  {Number(totalQty).toLocaleString('id-ID')}
                </td>
                <td>{o.shippingPhoneNumber}</td>

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
            );
          })}
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
                  onClick={() => setSelectedOrder(null)}
                />
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Status:</strong> {selectedOrder.status}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <p>
                      <strong>Customer:</strong>{' '}
                      {selectedOrder.shippingFullName}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <p>
                      <strong>Email:</strong> {selectedOrder.User?.email}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <p>
                      <strong>Payment:</strong> {selectedOrder.paymentMethod}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <p>
                      <strong>Phone:</strong>{' '}
                      {selectedOrder.shippingPhoneNumber}
                    </p>
                  </div>

                  <div className="col-md-6">
                    <p>
                      <strong>Address:</strong> {selectedOrder.shippingAddress}
                    </p>
                  </div>
                </div>

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Product</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Qty</th>
                      <th className="text-center">Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedOrder.OrderDetails?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.categoryName}</td>
                        <td>{item.productName}</td>

                        <td className="text-end">
                          Rp{' '}
                          {Number(item.productPrice).toLocaleString('id-ID', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </td>

                        <td className="text-end">{item.qty}</td>

                        <td className="text-end">
                          Rp{' '}
                          {Number(item.subtotal).toLocaleString('id-ID', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedOrder(null)}
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
