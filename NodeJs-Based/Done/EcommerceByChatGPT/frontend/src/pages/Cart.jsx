import React, { useContext } from 'react';
import { Store } from '../context/Store';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { state, dispatch } = useContext(Store);
  const navigate = useNavigate();
  const { cartItems } = state.cart;

  const remove = (id) => dispatch({ type: 'CART_REMOVE_ITEM', payload: id });

  const checkout = () => navigate('/checkout');

  const total = cartItems.reduce((acc, it) => acc + it.price * it.qty, 0);

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link to="/">Go shopping</Link>
        </div>
      ) : (
        <div style={{display:'grid', gridTemplateColumns:'1fr 300px', gap:20}}>
          <div>
            {cartItems.map(item => (
              <div key={item.product} className="card" style={{display:'flex', gap:12, marginBottom:12, alignItems:'center'}}>
                <img src={item.image || '/images/tee.jpg'} alt={item.name} style={{width:80, height:80, objectFit:'cover', borderRadius:6}} />
                <div style={{flex:1}}>
                  <Link to={`/product/${item.product}`}><strong>{item.name}</strong></Link>
                  <div className="small">${item.price.toFixed(2)} x {item.qty}</div>
                </div>
                <div>
                  <button className="btn" onClick={() => remove(item.product)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <h3>Order Summary</h3>
            <div className="small">Items: ${total.toFixed(2)}</div>
            <div style={{marginTop:12}}>
              <button className="btn" onClick={checkout}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
