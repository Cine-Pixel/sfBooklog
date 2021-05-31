import React from "react";
import Sidebar from "../sidebar/Sidebar";
import PostList from "../post/PostList";

import "./Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="container dashboard-container">
        <div className="post-list">
          <PostList />
        </div>
        <div className="side-info">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
