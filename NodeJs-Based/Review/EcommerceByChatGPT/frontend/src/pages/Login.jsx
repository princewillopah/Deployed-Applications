import React, { useState, useContext } from 'react';
import api from '../api/apiClient';
import { Store } from '../context/Store';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      dispatch({ type: 'USER_LOGIN', payload: res.data });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Login</h2>
        {error && <div style={{color:'red'}}>{error}</div>}
        <form onSubmit={submit}>
          <div style={{marginBottom:10}}>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
          </div>
          <div style={{marginBottom:10}}>
            <input className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" />
          </div>
          <div><button className="btn" type="submit">Login</button></div>
          <div style={{marginTop:8}} className="small">Test admin: admin@admin.com / admin</div>
        </form>
      </div>
    </div>
  );
}
