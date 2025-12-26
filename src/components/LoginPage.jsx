import React, { useState } from "react";
import "./Login.css";
import { loginUser } from "../api/authService";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res.data.access_token);
      setMessage("Login Successful!!");
      setType("success");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      setMessage("Invalid username or password");
      setType("error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login Page</h2>
        <p>Please enter your login and password...</p>
        {message && <div className={`alert ${type}`}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon">👤</span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <span className="icon">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="forgot">Forgot password?</div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
