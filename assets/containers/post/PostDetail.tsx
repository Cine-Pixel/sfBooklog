import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import FetchPost from "../../api/FetchPost";
import { CommentType, PostType } from "./Types";

import "./PostDetail.css";
import fetchComments from "../../api/fetchComments";

const PostDetail = () => {
  const [post, setPost] = useState<PostType>();
  const [comments, setComments] = useState<CommentType[]>([]);
  const { postId } = useParams<{ postId: string }>();
  const { currentUser } = useAuth();

  const redisplayComments = async () => {
    console.log("rediaplay");
    fetchComments(currentUser.token, Number(post.id)).then((comms) =>
      setComments(comms)
    );
  };

  useEffect(() => {
    FetchPost(currentUser.token, Number(postId)).then((post) => {setPost(post); setComments(post.comments)});
  }, []);

  return (
    <div className="container post-detail-container">
      {post && (
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
      {post && (
        <div className="post-info">
          <h1>{post.title}</h1>
          <p>Created by: {post.fkUser.username}</p>
          <img src={post.imageUrl} />
        </div>
      )}

      <div>
        {post && (
          <div className="comments">
            <CreateComment
              postId={Number(postId)}
              redisplayComments={redisplayComments}
            />
            {comments && comments.map((comm, idx) => (
              <Comment key={idx} comment={comm} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
