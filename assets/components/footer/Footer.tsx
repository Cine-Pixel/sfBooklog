import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  // if (props.location.pathname === "/signin-signup") return false;

  return (
    <footer>
      <div className="container footer-block-wrapper">
        <div className="footer-block">
          <h1>Booklog</h1>
          <div className="icons-wrapper">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
        <div className="footer-block">
          <Link to="/about">
            About Us
          </Link>
          <Link to="/contact">
            Contact
          </Link>
        </div>
        {/* <div className="footer-block"></div> */}
        <div className="footer-block">
          <Link to="/auth" className="footer-button">
            Start
          </Link>
          <p>
            &#169; BookLog. All RIghts Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
