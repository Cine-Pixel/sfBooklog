import React, { PropsWithChildren, ReactNode, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import "./Navbar.css";
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
import { useAuth } from "../../contexts/AuthContext";
import UserControls from "./UserControls";
// import UserControls from "./UserControls";

type Props = RouteComponentProps<any> & {
  location: { pathname: string };
};

const Navbar: React.FC<Props> = (props) => {
  const [active, setActive] = useState(false);
  const [navState, setNavState] = useState(false);
  const { currentUser } = useAuth();

  if (props.location.pathname === "/auth") return <></>;

  const handleNavState = () => {
    if (window.scrollY >= 150 && props.location.pathname === "/")
      setNavState(true);
    else setNavState(false);
  };

  window.addEventListener("scroll", handleNavState);

  const handleMenu = () => {
    setActive(!active);
  };

  return (
    <nav
      className={
        navState || props.location.pathname !== "/"
          ? "navbar navbar-filled"
          : "navbar"
      }
    >
      <div className="navbar-wrapper container">
        <Link className="navbar__logo" to="/">
          BookLog
        </Link>

        <ul className={active ? "navbar__links active" : "navbar__links"}>
          {currentUser.token !== "" ? <SignedInLinks /> : <SignedOutLinks />}
          <li>
            {currentUser.token !== "" ? (
              <UserControls />
            ) : (
              <Link className="btn-small z-depth-0" to="/auth">
                Login
              </Link>
            )}
          </li>
        </ul>

        <button className="menu-btn" onClick={handleMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
