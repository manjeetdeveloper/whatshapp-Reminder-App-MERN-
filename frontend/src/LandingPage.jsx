import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './LandingPage.css';
import { FaBell, FaUser, FaLock, FaEnvelope, FaTimes, FaUserShield } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        toast.error('Please fill all required fields');
        return;
      }

      const res = await axios.post('http://localhost:9000/login', {
        email: formData.email.trim(),
        password: formData.password
      });
      
      if (res.data.token && res.data.user) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        toast.success('Login successful!');
        
        if (res.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/app');
        }
      } else {
        toast.error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill all required fields');
        return;
      }

      const signupData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role || 'user'
      };

      const res = await axios.post('http://localhost:9000/register', signupData);
      
      if (res.data.token && res.data.user) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        toast.success('Registration successful!');
        
        if (res.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/app');
        }
      } else {
        toast.error('Invalid response from server');
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data || err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-brand">
          <FaBell className="brand-icon" />
          <span>Remind Me</span>
        </div>
        <div className="nav-buttons">
          <button className="auth-btn" onClick={() => setShowLogin(true)}>Login</button>
          <button className="auth-btn signup" onClick={() => setShowSignup(true)}>Sign Up</button>
        </div>
      </nav>

      <div className="landing-content">
        <div className="hero-section">
          <div className="hero-text">
            <h1>Never Miss Important Moments</h1>
            <p>Stay organized and focused with our smart reminder system. Get notifications via WhatsApp and voice calls.</p>
            <button className="cta-button" onClick={() => setShowSignup(true)}>
              Get Started
            </button>
          </div>
          <div className="hero-image">
            {/* Add your hero image here */}
          </div>
        </div>

        <div className="features-section">
          <h2>Why Choose Remind Me?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaBell />
              <h3>Smart Notifications</h3>
              <p>Get reminders via WhatsApp and voice calls</p>
            </div>
            <div className="feature-card">
              <FaUser />
              <h3>Personal Dashboard</h3>
              <p>Manage all your reminders in one place</p>
            </div>
            <div className="feature-card">
              <FaLock />
              <h3>Secure & Private</h3>
              <p>Your data is encrypted and secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowLogin(false)}>
              <FaTimes />
            </button>
            <h2>Welcome Back!</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <FaLock />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Login</button>
            </form>
            <p className="switch-auth">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setShowLogin(false);
                  setShowSignup(true);
                }}
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowSignup(false)}>
              <FaTimes />
            </button>
            <h2>Create Account</h2>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <FaUser />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <FaLock />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <FaUserShield />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">Sign Up</button>
            </form>
            <p className="switch-auth">
              Already have an account?{' '}
              <button
                onClick={() => {
                  setShowSignup(false);
                  setShowLogin(true);
                }}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;