import React, { useState } from "react";

const ExploreItem = () => {
  const [saveClicked, setSaveClicked] = useState(false);

  return (
    <div className="explore-list-item">
      <div className="save-btn" onClick={() => setSaveClicked(!saveClicked)}>
        <i
          className="far fa-bookmark"
          style={{ display: saveClicked ? "none" : "" }}
        ></i>
        <i
          className="fas fa-bookmark"
          style={{ display: saveClicked ? "inline-block" : "" }}
        ></i>
      </div>
      <div className="explore-list-item__image">
        {/* <img src={post.coverImage} alt="list item" /> */}
      </div>
      <div className="explore-list-item__info">
        {/* <h3>{post.title}</h3>
        <p>{post.content}</p> */}
        <h3>title</h3>
        <p>content</p>
        <span className="type">Post</span>
      </div>
    </div>
  );
};

export default ExploreItem;
