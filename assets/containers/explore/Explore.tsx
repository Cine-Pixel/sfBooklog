import React, { useState } from "react";
import "./Explore.css";
import ExploreList from "./ExploreList";
import ExploreSearch from "./ExploreSearch";

const Explore = () => {
  const [filterData, setFilterData] = useState({
    keyword: "",
    type: "post",
    author: "",
    tag: "",
  });
  const [book, setBook] = useState();
  const [post, setPost] = useState();

  return (
    <>
      <ExploreSearch filterData={filterData} setFilterData={setFilterData} setBook={setBook} />
      {book && <ExploreList book={book} />}
    </>
  );
};
export default Explore;
