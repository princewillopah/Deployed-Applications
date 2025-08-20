import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const endpoints = {
    users: '/api/users',
    products: '/api/products',
    orders: '/api/orders',
    reviews: '/api/reviews'
  };

  useEffect(() => {
    const fetchData = async () => {
      const results = {};
      for (const [key, url] of Object.entries(endpoints)) {
        try {
          const res = await fetch(url);
          results[key] = res.ok ? await res.json() : { error: `HTTP ${res.status}` };
        } catch (err) {
          results[key] = { error: 'Network error' };
        }
      }
      setData(results);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading microservices...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🚀 Microservices Dashboard</h1>
      <p>Production-grade frontend (built in Docker)</p>

      {Object.entries(data).map(([svc, res]) => (
        <section key={svc} style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc' }}>
          <h2>{svc.toUpperCase()}</h2>
          <pre>{JSON.stringify(res, null, 2)}</pre>
        </section>
      ))}

      <footer style={{ marginTop: '50px', color: '#666' }}>
        <small>Powered by React + Nginx + Docker + Kubernetes</small>
      </footer>
    </div>
  );
}

export default App;