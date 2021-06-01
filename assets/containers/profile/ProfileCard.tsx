import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchUserData from "../../api/fetchUserData";
import { useAuth } from "../../contexts/AuthContext";
import { UserDataType } from "./Profile";

import "./ProfileCard.css";

interface StateType {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  picture: string,
  location: string
}

interface PropTypes {
  userData: UserDataType
}

const ProfileCard: React.FC<PropTypes> = ({userData}) => {
  // const [userData, setUserData] = useState<StateType>();
  // const { currentUser } = useAuth();

  // useEffect(() => {
  //   fetchUserData(currentUser.token).then((response) => setUserData(response));
  // }, []);

  return userData ? (
    <div className="box-wrapper">
				<div className="box">
					<div className="avatar">
						<img src={userData.picture} />
					</div>
					<div className="box-inner">
						<h3 className="name">{`${userData.firstname} ${userData.lastname}`}</h3>
						<h4 className="occupation">{userData.email}</h4>
						<p className="location"><i className="fa fa-map-marker"></i>{userData.location || "N/A"}</p>
					</div>
				</div>
			</div>
  ) : (
    <div>loading</div>
  );
};

export default ProfileCard;
