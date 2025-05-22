import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/employees/login`, { email, password });
      navigate('/dashboard'); // ✅ fixed route
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email address</label>
          <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        <p className="mt-3 text-center">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
