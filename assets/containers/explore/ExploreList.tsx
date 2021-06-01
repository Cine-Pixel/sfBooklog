import React, { useEffect } from "react";
import ExploreItem from "./ExploreItem";

interface PropTypes {
  book: any
}

const ExploreList: React.FC<PropTypes> = ({book}) => {
  return (
    <div className="container explore-list">
      <ExploreItem book={book} />
    </div>
  );
};

export default ExploreList;
