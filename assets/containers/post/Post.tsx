import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";

interface Post {
  id: number,
  content: string,
  createdAt: string,
  fkBook: {
    id: number,
    title: string
  },
  fkUser: {
    id: number,
    username: string
  }
}

interface Props {
  post: Post
}

const Post: React.FC<Props> = ({post}) => {
  return (
    <div className="card-container">
      <img src="" alt="" />
      <div className="card-info">
        <h3>{post.id}</h3>
        <p>{post.content.substr(0, 100)}...</p>
        <Link to={`/postdetail/${post.id}`} className="read-more-btn">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Post;
