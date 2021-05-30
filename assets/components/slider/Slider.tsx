import React, { useEffect, useState } from "react";
import Slide from "./Slide";
// import img from "../../img/book.jpg";
const img = require("../../img/book.jpg")

const Slider = () => {
  const [x, setX] = useState(0);
  const srcArr = [
    img,
    "https://www.neh.gov/sites/default/files/styles/featured_image_page/public/2018-06/openbooks.jpg?h=b69e0e0e&itok=06BUz0mY",
    "https://www.tc.columbia.edu/media/media-library-2018/departments/hbs/school-psychology/Brown-wooden-shelfs-fully-packed-with-books-in-a-library-900301626_1200x800.jpg",
  ];

  const goLeft = () => {
    x === 0 ? setX(-100 * (srcArr.length - 1)) : setX(x + 100);
  };
  const goRight = () => {
    x === -100 * (srcArr.length - 1) ? setX(0) : setX(x - 100);
  };

  const handleControlClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    let idx = parseInt(e.currentTarget.id);
    setX(idx * -100);
  };

  useEffect(() => {
    const loop = setTimeout(() => {
      goRight();
    }, 5000);
    return () => {
      clearTimeout(loop);
    }
  }, [])

  return (
    <div className="custom-slider">
      {srcArr.map((src, idx) => {
        return (
          <div
            className="slide"
            key={idx}
            style={{ transform: `translateX(${x}%)` }}
          >
            <Slide src={src} />
          </div>
        );
      })}
      <div className="controls">
        <div
          id="0"
          className={x === 0 ? "control control-active" : "control"}
          onClick={handleControlClick}
        ></div>
        <div
          id="1"
          className={x === -100 ? "control control-active" : "control"}
          onClick={handleControlClick}
        ></div>
        <div
          id="2"
          className={x === -200 ? "control control-active" : "control"}
          onClick={handleControlClick}
        ></div>
      </div>
      <div className="slider__navigation" id="go-left" onClick={goLeft}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <div className="slider__navigation" id="go-right" onClick={goRight}>
        <i className="fas fa-chevron-right"></i>
      </div>
      ;
    </div>
  );
};

export default Slider;
