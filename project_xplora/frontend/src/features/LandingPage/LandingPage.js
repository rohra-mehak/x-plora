import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../Login/LoginSlicer";
import "./LandingPage.css";
import Homepage from "../homepage/Home";
import { useHistory } from "react-router-dom";
import Login from "../Login/Login";
import Contact from "../contact/Contact";
// import ReactFullpage from '@fullpage/react-fullpage-umd'; // will return static version on server and "live" version on client

function LandingPage() {
  const [activeTab, setActiveTab] = useState({
    logo: "logo",
    home: "active",
    feature: "",
    login: "",
    contact: "",
  });

  const allEmptyState = {
    logo: "logo",
    home: "",
    feature: "",
    login: "",
    contact: "",
  };

  const dispatch = useDispatch();

  const toggleClassName = (e) => {
    switch (e.target.id) {
      case "home":
        setActiveTab({ ...allEmptyState, home: "active" });
        break;
      case "feature":
        setActiveTab({ ...allEmptyState, feature: "active" });
        break;

      case "login":
        setActiveTab({ ...allEmptyState, login: "active" });
        break;
      case "contact":
        setActiveTab({ ...allEmptyState, contact: "active" });
        break;

      default:
        break;
    }
    setActiveTab.placeholder = "active";
  };
  function logoutAction() {
    console.log("triggered");
    dispatch(logOutUser());
  }
  const { username } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);

  const { isAuthorized } = useSelector((state) => state.user);

  const disp = isAuthorized ? "none !important" : "visible";
  console.log(disp);

  // const history = useHistory();
  return (
    <div className="App">
      <header>
        <a href="." id="logo" className={activeTab.logo}>
          X-plora
        </a>
        <ul>
          <li>
            <a
              href="."
              id="home"
              className={activeTab.home}
              onClick={toggleClassName}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#next"
              id="feature"
              className={activeTab.feature}
              onClick={toggleClassName}
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#Login"
              id="login"
              className={activeTab.login}
              onClick={toggleClassName}
            >
              Login/Register
            </a>
          </li>
          <li>
            <a
              href="#Contact"
              id="contact"
              className={activeTab.contact}
              onClick={toggleClassName}
            >
              Contact
            </a>
          </li>
        </ul>
      </header>
      <section className="homePage">
        <Homepage />
      </section>
      <section className="Login">
        <Login />
      </section>
      <section className="Contact">
        <Contact />
      </section>
    </div>
  );
}
export default LandingPage;
