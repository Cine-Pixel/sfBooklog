import React, { useState } from "react";

interface PropTypes {
  book: any
}

const ExploreItem: React.FC<PropTypes> = ({book}) => {
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
        <img src={book.imageUrl} alt="list item" />
      </div>
      <div className="explore-list-item__info">
        <h3>{book.title}</h3>
        <p>{book.description}</p>
        <span className="type">Book</span>
      </div>
    </div>
  );
};

export default ExploreItem;
