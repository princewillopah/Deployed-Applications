// frontend/src/App.jsx
import { useEffect, useState } from 'react';

function App() {
  const [services, setServices] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [users, products, orders, reviews] = await Promise.all([
          fetch('/api/users').then(r => r.json()),
          fetch('/api/products').then(r => r.json()),
          fetch('/api/orders').then(r => r.json()),
          fetch('/api/reviews').then(r => r.json())
        ]);
        setServices({ users, products, orders, reviews });
      } catch (err) {
        console.error("Fetch error:", err);
        setServices({
          users: { message: "Error" },
          products: { message: "Error" },
          orders: { message: "Error" },
          reviews: { message: "Error" }
        });
      }
    };

    fetchAll();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>🚀 Microservices Dashboard</h1>
      <div style={{ display: 'grid', gap: '20px', maxWidth: '800px' }}>
        <div style={cardStyle}>
          <h3>👤 User Service</h3>
          <p>{services.users?.message || 'Loading...'}</p>
        </div>

        <div style={cardStyle}>
          <h3>📦 Product Service</h3>
          <p>{services.products?.message || 'Loading...'}</p>
        </div>

        <div style={cardStyle}>
          <h3>🛒 Order Service</h3>
          <p>{services.orders?.message || 'Loading...'}</p>
        </div>

        <div style={cardStyle}>
          <h3>⭐ Review Service</h3>
          <p>{services.reviews?.message || 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#f9f9f9'
};

export default App;