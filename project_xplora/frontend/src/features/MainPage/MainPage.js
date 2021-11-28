import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser, updateProblem } from "../Login/LoginSlicer";
// import { setUserCredentials, logOutUser } from "./LoginSlicer";
import { useHistory, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./MainPage.css";

export default function MainPage() {
  let user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  let problem = useSelector((state) => state.user.problem);

  function a(para) {
    problem = para;
  }

  useEffect(() => {
    console.log("page ref mean problem was created");
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
        console.log(
          "Page was refreshed, new data is fetched and Problem variable is updated."
        );
        a(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // history.push("/main");
  }, []);

  function logMeOut() {
    localStorage.removeItem("isAuthorized");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("problemId");
    console.log("ab age");

    dispatch(logOutUser());
  }
  useEffect(() => {
    console.log("MainPage mounted");
  }, []);

  return (
    <section className="HomePage" id="main">
      <h1> title: {problem.title}</h1>
      <br></br>
      <h1> des: {problem.description}</h1>
      <br></br>

      <button onClick={logMeOut}>Log the fuck out</button>
      <h1> Stage cureent number: {problem.stageDetails.stageNumber}</h1>
    </section>
  );
}
