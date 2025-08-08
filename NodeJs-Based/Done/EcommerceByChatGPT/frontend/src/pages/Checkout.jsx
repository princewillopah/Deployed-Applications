import React, { useContext } from 'react';
import { Store } from '../context/Store';
import api from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();
  const { cartItems } = state.cart;

  const placeOrder = async () => {
    if (!state.user) return navigate('/login');
    const itemsPrice = cartItems.reduce((a,b) => a + b.price * b.qty, 0);
    const order = {
      orderItems: cartItems,
      shippingAddress: { address: 'Demo St', city: 'City', postalCode: '00000', country: 'Country' },
      paymentMethod: 'PayPal',
      itemsPrice, shippingPrice: 0, taxPrice: 0, totalPrice: itemsPrice
    };
    try {
      const res = await api.post('/orders', order);
      dispatch({ type: 'CART_REMOVE_ITEM', payload: null }); // reset
      navigate(`/`);
      alert('Order placed! Order id: ' + res.data._id);
    } catch (err) {
      alert(err.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="card">
        <div className="small">Items: ${cartItems.reduce((a,b)=>a+b.price*b.qty,0).toFixed(2)}</div>
        <div style={{marginTop:12}}>
          <button className="btn" onClick={placeOrder}>Place Order (Demo)</button>
        </div>
      </div>
    </div>
  );
}
