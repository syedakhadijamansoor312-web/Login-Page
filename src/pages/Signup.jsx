import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('https://jwt-server-production-40d1.up.railway.app/user/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setErrorMsg(data.message || 'Signup failed! Please check your details.');
      }
    } catch (err) {
      setErrorMsg('Server connection error!');
    } finally {
      setLoading(false);
    }
  };

  const s = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
    },
    card: {
      background: '#ffffff',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
      width: '100%',
      maxWidth: '420px',
    },
    title: {
      margin: '0 0 10px 0',
      fontSize: '28px',
      color: '#333',
      textAlign: 'center',
      fontWeight: '700',
    },
    subtitle: {
      margin: '0 0 30px 0',
      fontSize: '14px',
      color: '#666',
      textAlign: 'center',
    },
    error: {
      background: '#ffe6e6',
      color: '#d9534f',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '13px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    inputGroup: {
      marginBottom: '20px',
      position: 'relative',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      color: '#444',
      fontWeight: '600',
    },
    input: {
      width: '100%',
      padding: '12px 45px 12px 14px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '15px',
      boxSizing: 'border-box',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    eyeBtn: {
      position: 'absolute',
      right: '12px',
      top: '38px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#777',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      width: '100%',
      padding: '12px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
    },
    footerText: {
      marginTop: '25px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#666',
    },
    link: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '600',
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h2 style={s.title}>Create Account</h2>
        <p style={s.subtitle}>Sign up with your Username and Password</p>

        {errorMsg && <div style={s.error}>{errorMsg}</div>}

        <form onSubmit={handleSignup}>
          <div style={s.inputGroup}>
            <label style={s.label}>username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              style={s.input}
            />
          </div>

          <div style={s.inputGroup}>
            <label style={s.label}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              style={s.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={s.eyeBtn}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>

          <button type="submit" disabled={loading} style={s.btn}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p style={s.footerText}>
          Already have an account? <Link to="/login" style={s.link}>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;



