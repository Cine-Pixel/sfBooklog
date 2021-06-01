import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import EditorConvertToHtml from "./Editor";
import { useAuth } from '../../contexts/AuthContext';
import { Redirect, useHistory } from 'react-router';
import submitPost from "../../api/submitPost";

import "./CreatePost.css";

const CreatePost: React.FC = () => {
    const history = useHistory();
    const [postData, setPostData] = useState<{title:string, book:string}>({
        title: "",
        book: ""
    });
    const [editorState, setEditorState] = useState({state: EditorState.createEmpty()});
    const [photo, setPhoto] = useState<File>();
    const [loading , setLoading] = useState<boolean>(false);
    const {currentUser} = useAuth();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setLoading(true);

        let content = draftToHtml(convertToRaw(editorState.state.getCurrentContent()));
        const formdata = new FormData();
        formdata.append("title", postData.title);
        formdata.append("bookID", postData.book);
        formdata.append("content", content);
        formdata.append("photo", photo, photo.name);

        const response = await submitPost(currentUser.token, formdata);
        setLoading(false);
        history.push("/dashboard");
    }

    const handleChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement> = (e) => {
        setPostData({
            ...postData,
            [e.target.id]: e.target.value
        });
    }

    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPhoto(e.target.files[0]);
    }

    return (
        <form className="container create-post-container" onSubmit={handleSubmit}>
           <EditorConvertToHtml editorState={editorState} setEditorState={setEditorState} /> 
           <div className="post-controls">
               <div className="post-controls__row">
                    <h2>Choose title for your post</h2>
                    <input type="text" id="title" onChange={handleChange} value={postData.title} />
               </div>
               <div className="post-controls__row">
                    <h2>Choose or make new book</h2>
                    <select onChange={handleChange} id="book">
                        <option value="1">Gatsby</option>
                        <option value="2">dorian gray</option>
                        <option value="3">someting</option>
                        <option value="4">weird</option>
                    </select>
                    <input type="text" id="book" onChange={handleChange} value={postData.book} />
               </div>
               <div className="post-controls__row">
                    <h2>Upload Cover image</h2>
                    <input type="file" onChange={handleFileChange}/>
               </div>
               <div className="post-controls__row">
                    <button disabled={loading} className="create-btn">Create</button>
               </div>
           </div>
        </form>
    )
}

export default CreatePost;
