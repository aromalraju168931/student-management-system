import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call to Django 
      const res = await axios.post('https://sms-backend-rtbs.onrender.com/api/login/', credentials);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password.');
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <header>
          <div className="nav-brand" style={{justifyContent: 'center', marginBottom: '10px'}}>
             <span className="brand-main">ADMINISTRATION SIGN IN</span>
             <span className="brand-sub"></span>
          </div>
          <p>Welcome back! Please enter your details.</p>
        </header>

        {error && <div className="login-error" style={{marginBottom: '20px', color: 'red', fontSize: '14px', fontWeight: 600}}>⚠️ {error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="btn-main btn-sign-in" disabled={loading}>
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <footer className="login-footer">
          &copy; 2026 Administration System
        </footer>
      </div>
    </div>
  );
};

export default Login;