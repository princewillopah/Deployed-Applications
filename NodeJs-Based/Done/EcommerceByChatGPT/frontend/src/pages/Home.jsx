import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const loc = useLocation();

  const params = new URLSearchParams(loc.search);
  const q = params.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/products?search=${encodeURIComponent(q)}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [q]);

  return (
    <div className="container">
      <h2 style={{margin:'18px 0'}}>Products</h2>
      <div className="grid">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
