/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser, updateProblem } from "../Login/LoginSlicer";
// import { setUserCredentials, logOutUser } from "./LoginSlicer";
import { useHistory, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./MainPage.css";
import BOXES from "./boxes.gif";
import EARTHGIF from "./Bharat.gif";
import PEN from "./pen.png";

export default function MainPage() {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let problem = useSelector((state) => state.user.problem);

  function updateWithStore(para) {
    problem = para;
  }

  useEffect(() => {
    const problemKey = JSON.parse(localStorage.getItem("problemId")).value;
    const token = JSON.parse(localStorage.getItem("token")).value;
    axios
      .get(`http://127.0.0.1:8000/prob-detail/${problemKey}/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        dispatch(updateProblem(res.data));
        updateWithStore(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function onLogOutClick() {
    dispatch(logOutUser());
    localStorage.removeItem("isAuthorized");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("problemId");
  }

  const [activeTab, setActiveTab] = useState({
    logo: "logo",
    problem: "active",
    solution: "",
    support: "",
  });

  const allEmptyState = {
    logo: "logo",
    problem: "",
    solution: "",
    support: "",
  };

  const toggleClassName = (e) => {
    switch (e.target.id) {
      case "problem":
        setActiveTab({ ...allEmptyState, problem: "active" });
        break;
      case "solution":
        setActiveTab({ ...allEmptyState, solution: "active" });
        break;
      case "support":
        setActiveTab({ ...allEmptyState, login: "support" });
        break;
      default:
        break;
    }
    setActiveTab.placeholder = "active";
  };

  // const [editProblem, setEditProblem] = React.useState(false);

  // function handleProblemEdit() {}

  return (
    <section className="MainPage" id="main">
      <header>
        <a href="." id="logo" className={activeTab.logo}>
          X-plora
        </a>
        <ul>
          <li>
            <a
              href="."
              id="problem"
              className={activeTab.problem}
              onClick={toggleClassName}
            >
              Problem
            </a>
          </li>
          <li>
            <a
              href="#soultion"
              id="Solution"
              className={activeTab.solution}
              onClick={toggleClassName}
            >
              Solution
            </a>
          </li>
          <li>
            <a
              href="#support"
              id="support"
              className={activeTab.support}
              onClick={toggleClassName}
            >
              Support
            </a>
          </li>
          <li>
            <button onClick={onLogOutClick}>Log Out</button>
          </li>
        </ul>
      </header>

      <section id="Problem" className="Problem">
        <div className="Content">
          <div className="dataAndEdit">
            <h2>Problem Details</h2>
            <img src={PEN} className="pen" />
          </div>

          <hr></hr>
          <h5>Title</h5>

          <h3 id="contentProblem">{problem.problemName}</h3>

          <br></br>

          <h5>Description</h5>
          <h3 id="contentProblem">{problem.description}</h3>

          <footer>Note: Please send your dataset to xplora@gmail.com</footer>
        </div>

        {/* This is edit pop up */}

        {/* <div className="editProblemPopup" hidden={editProblem}></div> */}

        <div className="container rotatingEarth">
          <img src={EARTHGIF} className="box" />
        </div>
      </section>
    </section>
  );
}
