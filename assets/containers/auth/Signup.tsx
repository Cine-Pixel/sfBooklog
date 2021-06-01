import React, { useState } from "react";
import { validateEmail } from "../../utils/validateEmail";
import { passwordLevel } from "../../utils/passwordLevel";
import register from "../../api/register";

const Signup: React.FC = () => {
  const [error, setError] = useState("");
  const [passwordScore, setPasswordScore] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    if (userData.password) setPasswordScore(passwordLevel(userData.password));
    console.log(passwordScore);
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    } = userData;

    if (!validateEmail(email)) {
      setError("Invalid Email Address");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords don't match");
      return;
    }
    const response = await register(firstName, lastName, email, password, passwordConfirm); 
    setLoading(false);
    console.log(response);
  };

  return (
    <div className="form-container signup-container">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <div className="social">
            <i className="fab fa-facebook-f"></i>
          </div>
          <div className="social">
            <i className="fab fa-google-plus-g"></i>
          </div>
          <div className="social">
            <i className="fab fa-linkedin-in"></i>
          </div>
        </div>
        <span>
          {error ? (
            <p style={{ color: "red", padding: 0, margin: 0 }}>{error}</p>
          ) : (
            "or use you email for registration"
          )}
        </span>
        <div className="row">
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            value={userData.firstName}
            onChange={handleChange}
          />
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
        <span>{passwordScore && passwordScore}</span>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
        <input
          id="passwordConfirm"
          type="password"
          placeholder="Confirm Password"
          value={userData.passwordConfirm}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
