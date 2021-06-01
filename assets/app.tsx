import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/App.css";
import AuthUser from "./containers/auth/AuthUser";
import Contact from "./containers/contact/Contact";
import Footer from "./components/footer/Footer";
import About from "./containers/about/About";
import Navbar from "./components/navbar/Navbar";
import Landing from "./containers/landing/Landing";
import Dashboard from "./containers/dashboard/Dashboard";
import Explore from "./containers/explore/Explore";
import PrivateRoute from "./hoc/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import CreatePost from "./containers/create/CreatePost";
import PostDetail from "./containers/post/PostDetail";
import Profile from "./containers/profile/Profile";

const App: React.FC = () => {
  const {currentUser} = useAuth();

  return (
    <>
      <Router>
        <div className="main">
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>
            <PrivateRoute exact path="/dashboard" token={currentUser.token} component={Dashboard} />
            <PrivateRoute exact path="/explore" token={currentUser.token} component={Explore} />
            <PrivateRoute exact path="/create" token={currentUser.token} component={CreatePost} />
            <PrivateRoute exact path="/profile" token={currentUser.token} component={Profile} />
            <Route path="/postDetail/:postId">
              <PostDetail />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/about" exact component={About} />
            <Route path="/auth" exact component={AuthUser} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
