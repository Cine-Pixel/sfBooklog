import React from "react";
import { CommentType } from "./Types";

import "./Comment.css";

interface Props {
  comment: CommentType;
}

const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <div className="comment">
      <h3>{comment.fkUser.username}</h3>
      <p>{comment.content}</p>
    </div>
  );
};

export default Comment;
