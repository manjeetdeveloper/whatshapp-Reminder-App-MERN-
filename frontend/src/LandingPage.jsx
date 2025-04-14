import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="landing-page">
      <div className="nav-buttons">
        <button className="auth-btn" onClick={() => setShowLogin(true)}>Login</button>
        <button className="auth-btn" onClick={() => setShowSignup(true)}>Sign Up</button>
      </div>

      <div className="landing-content">
        <div className="illustration"></div>
        <div className="logo"></div>
        <h1>Manage your team & everything with taskoo</h1>
        <p>When you stay organized,there's no limit to what you can achieve.</p>
        <button className="start-button" onClick={() => navigate('/app')}>
          Let's Start
        </button>
      </div>

      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
            <h2>Login</h2>
            <form className="auth-form">
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {showSignup && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowSignup(false)}>×</button>
            <h2>Sign Up</h2>
            <form className="auth-form">
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;