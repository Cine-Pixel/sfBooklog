import React from "react";
import { Link } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </>
  );
};

export default SignedInLinks;
