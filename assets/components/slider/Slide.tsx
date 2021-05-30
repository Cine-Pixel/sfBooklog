import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";

type Props = {
  src: string
}

const Slide: React.FC<Props> = ({ src }) => {
  const imageStyles: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <>
      <div className="shade"></div>
      <div className="text-overlay">
        <h2>
            Connect with other book lovers
        </h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          veritatis aperiam quidem id vero molestias, unde nesciunt consequatur
          voluptas. Optio nemo, tempore tempora in vero est sapiente a corrupti
          illo obcaecati, fuga eum quis possimus autem voluptas provident eaque
          iusto?Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
          adipisci!
        </p>
        <br />
        <Link to="/signin-sugnup">
          Join Now
        </Link>
      </div>
      <img src={src} alt="slide" style={imageStyles} />;
    </>
  );
};

export default Slide;
