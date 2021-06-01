import React, { useState } from "react";
import submitComment from "../../api/submitComment";
import { useAuth } from "../../contexts/AuthContext";

import "./CreateComment.css";

interface stateProps {
    content: string,
    postID: number
}

interface PropTypes {
    postId: number,
    redisplayComments: () => Promise<void>
}

const CreateComment: React.FC<PropTypes> = ({postId, redisplayComments}) => {
  const [comment, setComment] = useState<stateProps>({
      content: "",
      postID: postId 
  });
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setComment({
        ...comment,
        content: e.target.value
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await submitComment(currentUser.token, comment.content, comment.postID);
    await redisplayComments();
    setComment({
        ...comment,
        content: ""
    });
    setLoading(false);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="comment-content-wrapper">
        <textarea
          name="comment-content"
          id="comment"
          onChange={handleChange}
          value={comment.content}
          rows={1}
          disabled={loading}
        ></textarea>
      </div>
      <div className="submit-comment">
        <button disabled={loading}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};

export default CreateComment;
