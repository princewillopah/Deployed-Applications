import React, { useEffect, useState, useContext } from 'react';
import api from '../api/apiClient';
import { useParams, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';
import Rating from '../components/Rating';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) { console.error(err); }
    };
    fetch();
  }, [id]);

  if (!product) return <div className="container">Loading...</div>;

  const addToCart = () => {
    dispatch({ type: 'CART_ADD_ITEM', payload: {
      product: product._id,
      name: product.name,
      image: product.images && product.images[0],
      price: product.price,
      qty: Number(qty)
    }});
    navigate('/cart');
  };

  return (
    <div className="container" style={{display:'flex', gap:20, alignItems:'flex-start'}}>
      <div style={{flex:'1 1 60%'}}>
        <img src={product.images && product.images.length ? product.images[0] : '/images/tee.jpg'} alt={product.name} style={{width:'100%', borderRadius:8}} />
      </div>
      <div style={{width:340}}>
        <h2>{product.name}</h2>
        <Rating value={product.rating || 0} text={`${product.numReviews || 0} reviews`} />
        <p style={{color:'#374151'}}>{product.description}</p>
        <div style={{marginTop:12}}>
          <div className="small">Price: <strong>${product.price.toFixed(2)}</strong></div>
          <div className="small">Status: {product.countInStock > 0 ? 'In stock' : 'Out of stock'}</div>
          {product.countInStock > 0 && (
            <div style={{marginTop:10}}>
              <label>Qty: </label>
              <select value={qty} onChange={e => setQty(e.target.value)} className="input" style={{width:80}}>
                {Array.from({length: Math.min(product.countInStock, 10)}, (_,i) => i+1).map(x => <option key={x} value={x}>{x}</option>)}
              </select>
            </div>
          )}
          <div style={{marginTop:16}}>
            <button className="btn" onClick={addToCart} disabled={product.countInStock===0}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
