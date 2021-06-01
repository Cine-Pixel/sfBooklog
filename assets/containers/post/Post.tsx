import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { Post } from "./Types";

interface Props {
  post: Post
}

const Post: React.FC<Props> = ({post}) => {
  return (
    <div className="card-container">
      <img src={post.imageUrl} alt="" />
      <div className="card-info">
        <h3>{post.title}</h3>
        <p>{post.title}...</p>
        <Link to={`/postdetail/${post.id}`} className="read-more-btn">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Post;
