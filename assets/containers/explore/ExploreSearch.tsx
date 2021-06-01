import React, { useState } from "react";
import searchBook from "../../api/searchBook";
import { useAuth } from "../../contexts/AuthContext";

interface PropTypes {
  filterData: {
    keyword: string,
    type: string,
    author: string,
    tag: string,
  }
  setFilterData: React.Dispatch<React.SetStateAction<{
    keyword: string;
    type: string;
    author: string;
    tag: string;
  }>>
  setBook: any
}

const ExploreSearch: React.FC<PropTypes> = ({filterData, setFilterData, setBook}) => {
  const [searchExpand, setSearchExpand] = useState(false);
  const {currentUser} = useAuth();

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    setFilterData({
      ...filterData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if(filterData.type === "book") {
      const response = await searchBook(currentUser.token, filterData.keyword);
      setBook(response);
    } else {
      // searchPost();
    }
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
          name="type"
          id="type"
          value={filterData.type}
          onChange={handleChange}
        >
          <option value="post">Post</option>
          <option value="book">Book</option>
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
