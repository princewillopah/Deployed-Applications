import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const [oRes, pRes] = await Promise.all([api.get('/orders'), api.get('/products')]);
      setOrders(oRes.data);
      setProducts(pRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
        <div className="card">
          <h3>Products</h3>
          <Link to="/admin/create" className="btn" style={{marginBottom:10}}>Create Product</Link>
          {products.map(p => <div key={p._id} style={{padding:'8px 0', borderBottom:'1px solid #f1f5f9'}}>{p.name} - ${p.price.toFixed(2)}</div>)}
        </div>
        <div className="card">
          <h3>Recent Orders</h3>
          {orders.slice(0,10).map(o => (
            <div key={o._id} style={{padding:'8px 0', borderBottom:'1px solid #f1f5f9'}}>
              {o._id} - {o.user?.name} - ${o.totalPrice}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
