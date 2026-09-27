import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const s = {
    page: {
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex',
      flexDirection: 'column',
    },
    navbar: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '20px 40px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    brand: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#333',
    },
    logoutBtn: {
      padding: '10px 20px',
      background: '#ff4d4d',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    content: {
      flex: 1,
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
    },
    card: {
      background: '#ffffff',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    },
    title: {
      margin: '0 0 10px 0',
      color: '#333',
    },
    text: {
      color: '#666',
      fontSize: '15px',
    }
  };

  return (
    <div style={s.page}>
      <nav style={s.navbar}>
        <div style={s.brand}>Dashboard App</div>
        <button onClick={handleLogout} style={s.logoutBtn}>Logout</button>
      </nav>
      <main style={s.content}>
        <div style={s.card}>
          <h2 style={s.title}>Welcome to Dashboard! 🎉</h2>
          <p style={s.text}>You have successfully signed up/logged in.</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;




