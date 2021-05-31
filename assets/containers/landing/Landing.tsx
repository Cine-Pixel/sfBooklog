import React, { useEffect, useState } from "react";
import Slider from "../../components/slider/Slider";
import "./Landing.css";
import fetchBooks from "../../api/fetchBooks";
import { useAuth } from "../../contexts/AuthContext";

const Landing = () => {
  const [books, setBooks] = useState([]);
  const { currentUser, removeToken } = useAuth();

  useEffect(() => {
    if (currentUser.token === "") return;
    fetchBooks(currentUser.token)
      .then((response) => {
        if(!response) {
          removeToken();
        }
        setBooks(response ? response : [])
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [currentUser.token]);

  return (
    <>
      <Slider />
      {/* <Search /> */}

      <section className="landing-main-display">
        <div className="container">
          <div className="featured">
            <h1>Featured Book</h1>
            <div className="custom-cards-wrapper">
              {books.map((book, id) => {
                return (
                  <div key={id} className="custom-card z-depth-1">
                    <div className="img-wrapper">
                      <img
                        src={book.imageUrl}
                        alt="Featured book"
                      />
                    </div>
                    <h4>{book.title}</h4>
                    <p className="image-description">{book.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
