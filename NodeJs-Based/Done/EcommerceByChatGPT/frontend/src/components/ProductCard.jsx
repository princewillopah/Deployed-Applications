import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img className="product-img" src={product.images && product.images.length ? product.images[0] : '/images/tee.jpg'} alt={product.name} />
      </Link>
      <h3 style={{margin:'10px 0 6px'}}>{product.name}</h3>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div className="small">${product.price.toFixed(2)}</div>
        <Link to={`/product/${product._id}`} className="btn small">View</Link>
      </div>
    </div>
  );
}
