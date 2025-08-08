import { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('/api/cart', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCart(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      await axios.post('/api/orders', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCart([]);
      alert('Order placed successfully!');
    } catch (err) {
      console.error(err);
      alert('Checkout failed.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item._id} className="flex items-center border-b py-4">
              <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover mr-4" />
              <div>
                <h3 className="text-lg">{item.product.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.product.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <button onClick={handleCheckout} className="mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;