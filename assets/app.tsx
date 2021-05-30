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
// import PrivateRoute from "./utils/PrivateRoute";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <div className="main">
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>
            {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/explore" exact component={Explore} />
            <Route path="/contact">
              <Contact />
            </Route>
            {/* <Route path="/profile">
              <Profile />
            </Route> */}
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
