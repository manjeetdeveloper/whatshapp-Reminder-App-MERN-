import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:9000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/app");
    } catch (err) {
      toast.error("Login failed: " + err.response.data);
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{" "}
        <span onClick={goToSignup} className="link-text">Sign Up</span>
      </p>
    </div>
  );
};

export default Login;
