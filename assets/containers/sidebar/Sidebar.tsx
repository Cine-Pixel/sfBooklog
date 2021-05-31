import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
  return (
      <div className="profile-card">
        <Link to="/profile" className="edit-profile">
          <i className="fas fa-ellipsis-h"></i>
        </Link>
        <img src="" alt="profile" />
        <div className="profile-info">
          <div className="profile-info-item">
            <span>Folowers</span>
            <br />
            <span className="profile-info-item-count">300</span>
          </div>
          <div className="profile-info-item">
            <span>Following</span>
            <br />
            <span className="profile-info-item-count">40</span>
          </div>
          <div className="profile-info-item">
            <span>Reviews</span>
            <br />
            <span className="profile-info-item-count">10</span>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
