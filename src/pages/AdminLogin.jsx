// src/pages/AdminLogin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInAdmin, isSupabaseConfigured, getCurrentUser } from '../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin Login - Oro-Care Dental';
    const existingMeta = document.querySelector('meta[name="robots"]');
    let adminMeta = existingMeta;
    let previousContent = '';

    if (!adminMeta) {
      adminMeta = document.createElement('meta');
      adminMeta.name = 'robots';
      document.head.appendChild(adminMeta);
    } else {
      previousContent = adminMeta.content;
    }

    adminMeta.content = 'noindex, nofollow';

    const checkAuth = async () => {
      if (!isSupabaseConfigured) return;

      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          navigate('/admin');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      }
    };

    checkAuth();

    return () => {
      if (adminMeta) {
        adminMeta.content = previousContent;
        if (!existingMeta && adminMeta.parentNode) {
          adminMeta.parentNode.removeChild(adminMeta);
        }
      }
    };
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');
    if (!isSupabaseConfigured) {
      setLoginError('Supabase is not configured. Please add environment variables and redeploy.');
      return;
    }

    setAuthenticating(true);
    try {
      const { data, error } = await signInAdmin(email, password);
      if (error || !data?.user) {
        throw error || new Error('Sign in failed.');
      }
      navigate('/admin');
    } catch (err) {
      setLoginError(err?.message || 'Unable to sign in. Please check your credentials.');
    } finally {
      setAuthenticating(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container admin-header-inner">
          <div>
            <h1 className="admin-title">🦷 Oro-Care Admin</h1>
            <p className="admin-sub">Secure admin access to appointment management</p>
          </div>
        </div>
      </div>
      <div className="container admin-body">
        <div className="login-card">
          <h2>Admin Login</h2>
          <p>Sign in with your Supabase admin account to view appointment requests.</p>
          <form onSubmit={handleLogin} className="login-form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@yourclinic.com"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your admin password"
                required
              />
            </label>
            {loginError && <p className="login-error">{loginError}</p>}
            <button type="submit" className="btn-primary" disabled={authenticating}>
              {authenticating ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          {!isSupabaseConfigured && (
            <div className="admin-help">
              <p>Supabase is not configured yet. Please add <code>REACT_APP_SUPABASE_URL</code> and <code>REACT_APP_SUPABASE_ANON_KEY</code> to your <code>.env</code> file, then redeploy.</p>
            </div>
          )}
          {isSupabaseConfigured && (
            <div className="admin-help">
              <p>If you don't have an admin account yet, create one in your Supabase project under Authentication &gt; Users.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-page {
          min-height: 100vh;
          background: #f0f4f8;
          font-family: var(--font-body);
        }
        .admin-header {
          background: linear-gradient(135deg, var(--ocean-dark), var(--ocean));
          padding: 24px 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--shadow-md);
        }
        .admin-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .admin-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--white);
          font-weight: 700;
        }
        .admin-sub {
          color: rgba(255,255,255,0.65);
          font-size: 0.85rem;
          margin-top: 2px;
        }
        .admin-body {
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .login-card {
          max-width: 500px;
          margin: 0 auto;
          background: var(--white);
          padding: 32px;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }
        .login-card h2 {
          margin-bottom: 12px;
          font-family: var(--font-display);
          font-size: 1.6rem;
        }
        .login-card p {
          margin-bottom: 24px;
          color: var(--text-mid);
          line-height: 1.7;
        }
        .login-form {
          display: grid;
          gap: 16px;
        }
        .login-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-dark);
        }
        .login-form input {
          padding: 12px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(10,74,110,0.15);
          font-size: 0.95rem;
          font-family: var(--font-body);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .login-form input:focus {
          border-color: var(--ocean);
        }
        .login-error {
          color: var(--error);
          font-size: 0.9rem;
          margin-top: -8px;
        }
        .admin-help {
          margin-top: 20px;
          font-size: 0.9rem;
          color: var(--text-mid);
          line-height: 1.75;
        }
        .admin-help code {
          background: rgba(10,74,110,0.06);
          padding: 2px 6px;
          border-radius: 6px;
        }
        @media (max-width: 768px) {
          .admin-body { padding: 20px 16px; }
        }
      `}</style>
    </div>
  );
}