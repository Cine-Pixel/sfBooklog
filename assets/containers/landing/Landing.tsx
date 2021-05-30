import React, { useEffect, useState } from "react";
import Slider from "../../components/slider/Slider";
import "./Landing.css";
import fetchBooks from "../../api/fetchBooks";
import { useAuth } from "../../contexts/AuthContext";

const featuredBooks = [
  {
    bookTitle: "The Great Gatsby",
    bookAuthor: "F.Scott Fitzgerald",
    imageUrl:
      "http://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471173936/the-great-gatsby-9781471173936_hr.jpg",
  },
];

const Landing = () => {
  const [books, setBooks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if(currentUser.token === "") return;
    fetchBooks(currentUser.token).then(response => setBooks(response));
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
                      <img src={featuredBooks[0].imageUrl} alt="Featured book" />
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
