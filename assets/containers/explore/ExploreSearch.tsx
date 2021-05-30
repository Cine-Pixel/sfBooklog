import React, { useState } from "react";

const ExploreSearch = () => {
  const [filterData, setFilterData] = useState({
    keyword: "",
    category: "",
    author: "",
    tag: "",
  });
  const [searchExpand, setSearchExpand] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    setFilterData({
      ...filterData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(
      filterData.keyword,
      filterData.category,
      filterData.author,
    );
  };

  return (
    <div
      className={
        searchExpand
          ? "container explore-form-wrapper expanded"
          : "container explore-form-wrapper"
      }
    >
      <button
        className="search-controller"
        onClick={() => setSearchExpand(!searchExpand)}
      >
        Expand
        <i className="fas fa-caret-down"></i>
      </button>
      <form className="container explore-form" onSubmit={handleSubmit}>
        <input
          id="keyword"
          value={filterData.keyword}
          onChange={handleChange}
          type="text"
          placeholder="Keyword"
        />
        <select
          name="category"
          id="category"
          value={filterData.category}
          onChange={handleChange}
        >
          <option value="romance">Romance</option>
          <option value="fiction">Fiction</option>
        </select>
        <input
          id="author"
          value={filterData.author}
          onChange={handleChange}
          type="text"
          placeholder="Author"
        />
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
};

export default ExploreSearch;
