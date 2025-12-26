import React, { useState } from "react";
import "./SignUp.css";
import { registerUser } from "../api/authService";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    role: "",
    isActive: "N"
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const [showPassword,setShowPassword]=useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isValidEmial=(email)=>{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if(!isValidEmial(formData.email)){
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }
    try {
      const response = await registerUser(formData);

      // token save (if backend returns)
      if (response.data?.access_token) {
        localStorage.setItem("token", response.data.access_token);
      }

      setMessage("Registration successful! 🎉");
      setMessageType("success");

      // redirect after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

    } catch (error) {
      setMessage(
        error.response?.data || "Registration failed!!"
      );
      setMessageType("error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <img
          src="https://cdn-icons-png.freepik.com/256/9977/9977134.png"
          alt="Signup Banner"
          className="signup-image"
        />

        <h2>Create Account</h2>
        {message && (
          <div className={`alert ${messageType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={formData.userName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

        <PhoneInput
            country={"in"}
            value={formData.mobileNumber}
            onChange={(phone,country,e,formattedValue) =>
              setFormData({ ...formData, mobileNumber: "+" +phone })
            }
            inputStyle={{ width: "100%" }}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <div className="checkbox-wrapper">
  <label className="checkbox">
    <input
      type="checkbox"
      checked={formData.isActive === "Y"}
      onChange={(e) =>
        setFormData({
          ...formData,
          isActive: e.target.checked ? "Y" : "N"
        })
      }
    />
    <span>Active</span>
  </label>
</div>
          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
