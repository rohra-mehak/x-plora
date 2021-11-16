import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Homepage from "./features/homepage/Home";
import Login from "./features/Login/Login";
// import ReactFullpage from '@fullpage/react-fullpage-umd'; // will return static version on server and "live" version on client

function App() {
  return (
    <div className="App">
      <header>
        <a href="." className="logo">
          X-plora
        </a>
        <ul>
          <li>
            <a href="." className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#next">Featues</a>
          </li>
          <li>
            <a href="#Login">Login/Register</a>
          </li>
          <li>
            <a href=".">Register</a>
          </li>
        </ul>
      </header>

      <section className="homePage">
        <Homepage />
      </section>

      <section className="Login">
        <Login />
      </section>
    </div>
  );
}

export default App;
