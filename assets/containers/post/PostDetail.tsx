import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import FetchPost from '../../api/FetchPost';
import { useAuth } from '../../contexts/AuthContext';
import { PostType } from './Types';

import "./PostDetail.css";

const PostDetail = () => {
    const [post, setPost] = useState<PostType>();
    const { postId } = useParams<{postId:string}>();
    const {currentUser} = useAuth();

    useEffect(() => {
        FetchPost(currentUser.token, Number(postId))
        .then(post => setPost(post));
    }, []);

    return (
        <div className="container post-detail-container">

            { post && <div className="post-content" dangerouslySetInnerHTML={{__html: post.content}} /> }
            { post && <div className="post-info">
                <h1>{post.title}</h1>
                <p>Created by: {post.fkUser.username}</p>
                <img src={post.imageUrl} />
            </div> }

            { post && <div className="comments">
                {post.comments.map((comm, idx) => <div>{comm.content}</div>)}
            </div> }
        </div>
    )
}

export default PostDetail
