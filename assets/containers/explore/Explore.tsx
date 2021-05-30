import React from "react";
import "./Explore.css";
import ExploreList from "./ExploreList";
import ExploreSearch from "./ExploreSearch";

const Explore = () => {
  return (
    <>
      <ExploreSearch />
      <ExploreList />
    </>
  );
};
export default Explore;
