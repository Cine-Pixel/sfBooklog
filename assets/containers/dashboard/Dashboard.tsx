import React from "react";
import "./Dashboard.css";
// import { PostList, ProfileInfo } from "../components";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="container dashboard-container">
        <div className="post-list">
          {/* <PostList /> */}
          posts
        </div>
        <div className="side-info">
          {/* <ProfileInfo /> */}
          sidebar
        </div>
      </div>
    </>
  );
};

export default Dashboard;
