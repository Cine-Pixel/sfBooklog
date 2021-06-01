import React, { useEffect, useState } from "react";
import fetchPosts from "../../api/FetchPosts";
import Post from "./Post";
import { useAuth } from "../../contexts/AuthContext";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if(currentUser.token === "") return;
    fetchPosts(currentUser.token).then(data => setPosts(data));
  }, [])

  return (
    <>
      {posts.map((post, idx) => <Post key={idx} post={post} />)}
    </>
  );
};

export default PostList;
