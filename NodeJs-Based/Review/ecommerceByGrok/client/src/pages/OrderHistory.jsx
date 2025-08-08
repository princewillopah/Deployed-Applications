import { useState, useEffect } from 'react';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="border-b py-4">
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total}</p>
            <div>
              {order.items.map(item => (
                <div key={item._id} className="flex items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover mr-4" />
                  <div>
                    <p>{item.product.name}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;