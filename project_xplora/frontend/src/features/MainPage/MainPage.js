import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProblem } from "../Login/LoginSlicer";
// import { setUserCredentials, logOutUser } from "./LoginSlicer";
import { useHistory, Route, Switch } from "react-router-dom";
import axios from "axios";

export default function MainPage() {
  let problem = useSelector((state) => state.user.problem);
  let user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    function updateProblemData() {
      if (problem.isCreated) {
        const problemKey = JSON.parse(localStorage.getItem("problemId")).value;
        const token = JSON.parse(localStorage.getItem("token")).value;

        axios
          .get(`http://127.0.0.1:8000/prob-detail/${problemKey}/`, {
            headers: {
              Authorization: `token ${token}`,
            },
          })
          .then((res) => {
            //once we get good resPONSE, WE CAN
            // UPDATE THE PROBLEM ON RELOAD.

            // KEEP IN MIND THAT THE PROBLEM ID IS STORED IN LOCAL STORAGE

            //   problem = {
            //     isProblemCreated: false,
            //     problemId: res.data,
            //     problemName: "",
            //     description: "",
            //     dataTransferType: "",
            //     stageDetails: {
            //         pk: -1,
            //         isActivated: false,
            //         isComplete: false,
            //         stageNumber: -1,
            //         state: "YELLOW",
            //   }
            dispatch(updateProblem(res.data));

            console.log(
              "Page was refreshed, new data is fetched and Problem variable is updated."
            );

            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      history.push("/main");
      console.log("lol, retained main page");
      updateProblemData();
    }
  }, [history, dispatch]);

  return (
    <section className="HomePage" id="main">
      <h1> title: {problem.problemName}</h1>
      <br></br>
      <h1> des: {problem.description}</h1>
      <br></br>

      <h1> Stage cureent number: {problem.stageDetails.stageNumber}</h1>
    </section>
  );
}
