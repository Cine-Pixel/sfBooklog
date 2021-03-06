import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchUserData from "../../api/fetchUserData";
import { useAuth } from "../../contexts/AuthContext";

import "./Sidebar.css";

interface StateType {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  picture: string,
  location: string
}

const Sidebar = () => {
  const [userData, setUserData] = useState<StateType>();
  const { currentUser } = useAuth();

  //TODO: fetch user
  useEffect(() => {
    fetchUserData(currentUser.token).then((response) => setUserData(response));
  }, []);

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

						<ul className="edit-links">
							<li className="edit-links-item"><Link to="/profile"><i className="fa fa-ellipsis-h"></i></Link></li>
						</ul>

					</div>
				</div>
			</div>
  ) : (
    <div>loading</div>
  );
};

export default Sidebar;
