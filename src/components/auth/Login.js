import React, { useState } from 'react';
import { login } from '../../utils/auth';
import { ROLE_LABELS } from '../../utils/rbac';
import './Login.css';

const DEMO_ACCOUNTS = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'principal', password: 'principal123', role: 'principal' },
  { username: 'faculty', password: 'faculty123', role: 'faculty' },
  { username: 'student', password: 'student123', role: 'student' },
  { username: 'finance', password: 'finance123', role: 'finance' },
  { username: 'admissions', password: 'admissions123', role: 'admissions' },
];

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(username.trim(), password);
      if (result.success) {
        onLogin(result.user);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 500);
  }

  function handleDemoLogin(account) {
    setUsername(account.username);
    setPassword(account.password);
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(account.username, account.password);
      if (result.success) {
        onLogin(result.user);
      }
      setLoading(false);
    }, 400);
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-branding">
          <div className="login-logo">🎓</div>
          <h1>Parul University</h1>
          <p>College Management Information System</p>
          <div className="login-features">
            <div className="feature-item">✅ Role-Based Access Control</div>
            <div className="feature-item">✅ Academic Management</div>
            <div className="feature-item">✅ Finance & Fee Tracking</div>
            <div className="feature-item">✅ Admissions Portal</div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h2>Sign In</h2>
            <p>Access your MIS portal</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" aria-label="Login form">
            {error && (
              <div className="login-error" role="alert" aria-live="assertive">
                ⚠️ {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                autoComplete="username"
                aria-label="Username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                aria-label="Password"
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading} aria-label="Sign in">
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className="demo-section">
            <p className="demo-title">Quick Demo Access</p>
            <div className="demo-grid">
              {DEMO_ACCOUNTS.map(account => (
                <button
                  key={account.role}
                  className={`demo-btn demo-btn--${account.role}`}
                  onClick={() => handleDemoLogin(account)}
                  disabled={loading}
                  aria-label={`Login as ${ROLE_LABELS[account.role]}`}
                >
                  {ROLE_LABELS[account.role]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
