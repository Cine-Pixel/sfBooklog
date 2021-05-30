import React, { useState } from "react";
import "./AuthUser.css";
import Signin from "./Signin";
import Signup from "./Signup";

const AuthUser: React.FC = () => {
  const [signupClicked, setSignupClicked] = useState(false);

  return (
    <div className="auth-container-wrapper">
      <div
        className={
          signupClicked ? "auth-container right-panel-active" : "auth-container"
        }
      >
        <Signup />
        <Signin />

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => setSignupClicked(!signupClicked)}
                className="ghost"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journay with us</p>
              <button
                onClick={() => setSignupClicked(!signupClicked)}
                className="ghost"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthUser;
