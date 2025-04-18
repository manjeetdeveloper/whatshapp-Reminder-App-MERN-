import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './LandingPage.css';
// import logo from '../src/assets/TAsko.png';
import { FaBell, FaUser, FaLock, FaEnvelope, FaTimes, FaUserShield, FaMobile } from 'react-icons/fa';

function LandingPage() { 
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
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
    setIsTyping(true);
    setIsPassword(e.target.name === 'password');
    
    // Clear typing state after 1 second of no typing
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const handleFocus = (e) => {
    setIsTyping(true);
    setIsPassword(e.target.name === 'password');
  };

  const handleBlur = () => {
    setIsTyping(false);
    setIsPassword(false);
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
      
      if (res.data.success || res.data.user) {
        toast.success('Registration successful! Please login.');
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'user'
        });
        setShowSignup(false);
        setShowLogin(true);
      } else {
        toast.error('Invalid response from server');
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data || err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const BearIllustration = () => (
    <div className={`bear-container ${isTyping ? 'typing' : ''} ${isPassword ? 'password-input' : ''}`}>
      <div className="bear-ears">
        <div className="ear left"></div>
        <div className="ear right"></div>
      </div>
      <div className="bear-face">
        <div className="bear-eyes">
          <div className="eye left"></div>
          <div className="eye right"></div>
        </div>
        <div className="bear-nose"></div>
        <div className="bear-muzzle"></div>
      </div>
      <div className="bear-typing"></div>
    </div>
  );

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-brand">
          <FaBell className="brand-icon" />
          {/* <span><img src={logo} ></img></span> */}
          <span>Taskoo</span>
        </div>
        <div className="nav-buttons">
          <button className="auth-btn" onClick={() => setShowLogin(true)}>Login</button>
          <button className="auth-btn signup" onClick={() => setShowSignup(true)}>Sign Up</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-text">
          <h1>Never Miss Important Moments</h1>
          <p>Stay organized and focused with our smart reminder system. Get notifications via WhatsApp and voice calls.</p>
          <button className="cta-button" onClick={() => setShowSignup(true)}>Get Started</button>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaBell />
            </div>
            <h3 className="feature-title">Smart Notifications</h3>
            <p className="feature-description">
              Never miss important events with our intelligent notification system that adapts to your schedule and priorities
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaMobile />
            </div>
            <h3 className="feature-title">Cross-Platform Access</h3>
            <p className="feature-description">
              Access your reminders from any device - mobile, tablet, or desktop. Stay synchronized everywhere you go
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaLock />
            </div>
            <h3 className="feature-title">Secure & Private</h3>
            <p className="feature-description">
              Your reminders are encrypted and protected. We prioritize your privacy and data security
            </p>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowLogin(false)}>
              <FaTimes />
            </button>
            <h2>Welcome Back!</h2>
            <BearIllustration />
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
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
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Login</button>
            </form>
            <div className="switch-auth">
              <p>Don't have an account? <button onClick={() => { setShowLogin(false); setShowSignup(true); }}>Sign Up</button></p>
            </div>
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
            <BearIllustration />
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <FaUser />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
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
                  onFocus={handleFocus}
                  onBlur={handleBlur}
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
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="form-group">
                <FaUserShield />
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">Sign Up</button>
            </form>
            <div className="switch-auth">
              <p>Already have an account? <button onClick={() => { setShowSignup(false); setShowLogin(true); }}>Login</button></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;