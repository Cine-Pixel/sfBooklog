import React from "react";
import { Link } from "react-router-dom";

const SignedOutLinks: React.FC = () => {
  return (
    <>
      <li>
        <Link to="/explore">Explore</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </>
  );
};

export default SignedOutLinks;
