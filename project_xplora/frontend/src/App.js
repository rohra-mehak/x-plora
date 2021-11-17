import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Homepage from "./features/homepage/Home";
import Login from "./features/Login/Login";
import Contact from "./features/contact/Contact";
// import ReactFullpage from '@fullpage/react-fullpage-umd'; // will return static version on server and "live" version on client

function App() {
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
              Featues
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
export default App;
