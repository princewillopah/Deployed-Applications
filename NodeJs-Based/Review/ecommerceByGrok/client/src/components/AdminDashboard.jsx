import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', image: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, userRes] = await Promise.all([
          axios.get('/api/products', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
          axios.get('/api/users', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
        ]);
        setProducts(productRes.data);
        setUsers(userRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/products', newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProducts([...products, res.data]);
      setNewProduct({ name: '', description: '', price: '', category: '', image: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Create Product</h3>
        <form onSubmit={handleCreateProduct} className="space-y-4">
          <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="p-2 border rounded w-full" />
          <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="p-2 border rounded w-full"></textarea>
          <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="p-2 border rounded w-full" />
          <input type="text" placeholder="Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="p-2 border rounded w-full" />
          <input type="text" placeholder="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} className="p-2 border rounded w-full" />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Create Product</button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Users</h3>
        {users.map(user => (
          <div key={user._id} className="border-b py-2">{user.username} {user.isAdmin ? '(Admin)' : ''}</div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;