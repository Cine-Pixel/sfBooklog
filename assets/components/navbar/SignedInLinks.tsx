import React from "react";
import { Link } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <>
      <li>
        <Link to="/create">Create</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/explore">Explore</Link>
      </li>
    </>
  );
};

export default SignedInLinks;
