import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../../layouts/AuthLayout';
import './LoginPage.css';

const LoginPage = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success('Login successful!');
        navigate('/dashboard', { replace: true });
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <AuthLayout>
      <div className="login-form-container">
        <h2 className="form-title">Login to Your Account</h2>
        <p className="form-subtitle">Enter your credentials to continue</p>
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              onKeyDown={handleKeyDown}
              placeholder="admin@spareparts.com"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              onKeyDown={handleKeyDown}
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>
          <button
            type="button"
            className="btn-submit"
            disabled={isLoading}
            onClick={handleLogin}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        <div className="form-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="link">Sign up here</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
