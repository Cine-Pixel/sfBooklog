import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { validateEmail } from "../../utils/validateEmail";
import { useAuth } from "../../contexts/AuthContext";

const Signin = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    lemail: "",
    lpassword: "",
  });

  const [error, setError] = useState("");
  const { executeLogin } = useAuth();

  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const email = userData.lemail;
    const password = userData.lpassword;

    if (!validateEmail(email)) {
      setError("Invalid Email Address");
      return;
    } else {
      executeLogin(email, password);
      history.push("/dashboard");
    }
  };

  return (
    <div className="form-container signin-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        {error ? <p style={{ color: "red" }}>{error}</p> : <></>}
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
        <span>or use your account</span>
        <input
          id="lemail"
          type="email"
          placeholder="Email"
          value={userData.lemail}
          onChange={handleChange}
        />
        <input
          id="lpassword"
          type="password"
          placeholder="Password"
          value={userData.lpassword}
          onChange={handleChange}
        />
        {/* <Link to="/passwordreset">Forgot your password?</Link> */}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
