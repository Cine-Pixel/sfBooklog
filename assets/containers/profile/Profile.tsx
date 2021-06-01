import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

import ProfileCard from "./ProfileCard";
import fetchFullUserData from "../../api/fetchFullUserData";
import updateProfile from "../../api/updateProfile";

import "./Profile.css";

export interface UserDataType {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  location: string;
  picture: string;
  posts: {
    id: number;
    title: string;
    imageUrl: string;
    createdAt: string;
  }[];
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserDataType>({
    id: 0,
    email: "",
    firstname: "",
    lastname: "",
    location: "",
    picture: "",
    posts: [],
  });
  const [photo, setPhoto] = useState<File>();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    setPhoto(e.target.files[0]);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("firstname", userData.firstname);
    data.append("lastname", userData.lastname);
    data.append("location", userData.location);
    data.append("email", userData.email);
    if (photo) data.append("picture", photo, photo.name);

    await updateProfile(currentUser.token, data);
    const newData = await fetchFullUserData(currentUser.token);
    setUserData(newData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFullUserData(currentUser.token).then((data) => setUserData(data));
  }, []);

  return (
    <div className="container profile-container">
      <div className="profile-card">
        <ProfileCard userData={userData} />
      </div>

      <div className="profile-content">
        <div className="my-info">
          <h1>My Info: </h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="my-info-row">
              <div className="my-info-col">
                <label htmlFor="firstname">
                  <span>First name</span>
                  <br />
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    onChange={handleChange}
                    value={userData.firstname}
                  />
                </label>
              </div>
              <div className="my-info-col">
                <label htmlFor="lastname">
                  <span>Last name</span>
                  <br />
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    onChange={handleChange}
                    value={userData.lastname}
                  />
                </label>
              </div>
            </div>

            <div className="my-info-row">
              <label htmlFor="email">
                <span>Email</span>
                <br />
                <input
                  disabled
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={userData.email}
                />
              </label>
            </div>

            <div className="my-info-row">
              <label htmlFor="location">
                <span>Location</span>
                <br />
                <input
                  type="text"
                  name="location"
                  id="location"
                  onChange={handleChange}
                  value={userData.location}
                />
              </label>
            </div>

            <div className="my-info-row">
              <label htmlFor="picture">
                <span>
                  Profile <i className="fas fa-camera"></i>
                </span>
                <input
                  hidden
                  onChange={handleFileChange}
                  type="file"
                  name="picture"
                  id="picture"
                />
              </label>
            </div>

            <div className="my-info-row">
              <button disabled={loading}>Update Profile</button>
            </div>
          </form>
        </div>
        <br />
        <div className="my-posts">
          <h1>My Posts: </h1>
          {userData.posts.map((post, idx) => (
            <Link to={`/postDetail/${post.id}`}>
              <blockquote key={idx}>
                <p>{post.title}</p>
                <cite>
                  {post.createdAt}
                  <span className="cite-last-name"></span>
                </cite>
                <div
                  className="blockquote-author-image"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                ></div>
              </blockquote>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
