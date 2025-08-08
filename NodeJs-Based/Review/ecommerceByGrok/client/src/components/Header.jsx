import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Header({ user, setUser }) {
  const [search, setSearch] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/products?search=${search}`);
      // Update state with search results (handled in Home.jsx)
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">E-Shop</Link>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="p-2 rounded-l text-black focus:outline-none"
          />
          <button type="submit" className="bg-blue-700 p-2 rounded-r hover:bg-blue-800">Search</button>
        </form>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/cart" className="hover:underline">Cart</Link>
              <Link to="/orders" className="hover:underline">Orders</Link>
              {user.isAdmin && <Link to="/admin" className="hover:underline">Admin</Link>}
              <button onClick={handleLogout} className="bg-red-500 p-2 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;