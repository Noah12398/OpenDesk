import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'lucide-react';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '16px'
      }}>
        <Loader className="spin" size={48} style={{ color: 'var(--color-primary)' }} />
        <p style={{ color: '#666' }}>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // User is authenticated but not an admin
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#333', marginBottom: '16px' }}>Access Denied</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          You need admin privileges to access this page.
        </p>
        <a href="/" style={{
          color: 'var(--color-primary)',
          textDecoration: 'none',
          fontWeight: 600
        }}>
          Return to Home
        </a>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
