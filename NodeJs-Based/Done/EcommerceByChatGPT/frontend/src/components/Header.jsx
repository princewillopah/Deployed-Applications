import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';

export default function Header() {
  const { state, dispatch } = useContext(Store);
  const cartCount = state.cart.cartItems.reduce((acc, it) => acc + it.qty, 0);
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const logout = () => {
    dispatch({ type: 'USER_LOGOUT' });
    navigate('/');
  };

  const doSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(q)}`);
  };

  return (
    <header className="header">
      <div className="top">
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div className="brand"><Link to="/" style={{color:'white'}}>MERN E-Store</Link></div>
          <form onSubmit={doSearch} className="search">
            <input className="input" placeholder="Search products..." value={q} onChange={e => setQ(e.target.value)} />
          </form>
        </div>
        <div className="nav-links">
          <Link to="/cart" style={{color:'white'}}>Cart ({cartCount})</Link>
          {state.user ? (
            <>
              <span style={{color:'white'}}>Hi, {state.user.user.name}</span>
              {state.user.user.isAdmin && <Link to="/admin" style={{color:'white'}}>Admin</Link>}
              <button className="btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{color:'white'}}>Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
