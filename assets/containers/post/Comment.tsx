import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { CommentType } from "./Types";

import "./Comment.css";
import removeComment from "../../api/removeComment";

interface Props {
  comment: CommentType;
  redisplayComments: () => Promise<void>
}

const Comment: React.FC<Props> = ({ comment, redisplayComments }) => {
  const { user, currentUser } = useAuth();

  const handleClick = async () => {
    const resposne = await removeComment(currentUser.token, comment.id, user.id)
    console.log(resposne);
    await redisplayComments();
  }

  return (
    <div className="comment">
      <div className="comment-content">
        <h3>{comment.fkUser.username}</h3>
        <p>{comment.content}</p>
      </div>
      {comment.fkUser.id === user.id ? <button onClick={handleClick} className="remove-comment"><i className="fas fa-trash"></i></button> : <></>}
    </div>
  );
};

export default Comment;
