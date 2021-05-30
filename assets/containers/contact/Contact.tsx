import React, { useState } from "react";

const Contact = () => {
  const [messageData, setMessageData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    setMessageData({
      ...messageData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(messageData.name, messageData.email, messageData.message);
  };

  return (
    <div className="container">
      <div className="page-header">
        <small>Get in Touch!</small>
        <h1>How can we help you?</h1>
      </div>
      <div className="form-wrapper">
        <form className="contact-form">
          <div className="contact-form__row">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={messageData.name}
              onChange={handleChange}
            />
          </div>
          <div className="contact-form__row">
            <label htmlFor="email">mail</label>
            <input
              id="email"
              type="email"
              value={messageData.email}
              onChange={handleChange}
            />
          </div>
          <div className="contact-form__row">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              value={messageData.message}
              onChange={handleChange}
              cols={30}
              rows={10}
            ></textarea>
          </div>
          <div className="contact-form__row">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
