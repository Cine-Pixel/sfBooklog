import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "./UserControls.css";

const UserControls = () => {
  const [profileClicked, setProfileClicked] = useState(false);
  const { removeToken } = useAuth();

  const handleLogout = () => {
    removeToken();
  };

  return (
    <>
      <div
        className="profile-icon"
        onClick={() => setProfileClicked(!profileClicked)}
      >
        <i className="fas fa-user"></i>
      </div>
      <ul
        className="profile-dropdown"
        style={{ display: profileClicked ? "block" : "none" }}
      >
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/favourites">Favourites</Link>
        </li>
        <li>
          <button className="sign-out" onClick={handleLogout}>
            Sign Out
          </button>
        </li>
      </ul>
      </>
  );
};

export default UserControls;
