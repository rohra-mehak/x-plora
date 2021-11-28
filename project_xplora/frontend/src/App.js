import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "./features/Login/LoginSlicer";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Homepage from "./features/homepage/Home";
import LandingPage from "./features/LandingPage/LandingPage";

import WelcomePage from "./features/welcomePage/WelcomePage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import getWithExpiry from "./features/Login/LoginSlicer";
import Contact from "./features/contact/Contact";
// import ReactFullpage from '@fullpage/react-fullpage-umd'; // will return static version on server and "live" version on client

function App() {
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const history = useHistory();

  // function requireAuth(nextState, replace, next) {
  //   if (isAuthorized === true) {
  //     replace({
  //       pathname: "/",
  //       state: { nextPathname: nextState.location.pathname },
  //     });
  //   }
  //   next();
  // }

  return (
    // <Router>
    //   <Switch>
    //     <Route exact path="/" component={LandingPage} />

    //     <Route path="/main" component={WelcomePage} />
    //   </Switch>
    // </Router>

    isAuthorized ? <WelcomePage /> : <LandingPage />
  );
}
export default App;
