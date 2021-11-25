/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import "./WelcomePage.css";
// import axios from "axios";
// import STARS from "./stars.png";
import { useSelector, useDispatch } from "react-redux";
import { updateProblem } from "../Login/LoginSlicer";
// import { setUserCredentials, logOutUser } from "./LoginSlicer";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
export default function WelcomePage() {
  const firstVisit = useSelector((state) => state.user.problem.firstVisit);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /**
   * initial state
   * problem: {
      firstVisit: true,
      problemName: "",
      description: "",
      dataTransferType: "",
      id: "",
    },
   */
  const problem = useState(useSelector((state) => state.user.problem));

  const submitProblem = (e) => {
    e.preventDefault();
    // const pr{
    //   title: e.target[0].value,
    //   dataset_description: e.target[1].value,
    //   dataTransferType: 'Drive',
    //   id: ''
    // });

    console.log(e.target[0].value, e.target[1].value);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };

    axios
      .post(
        "http://127.0.0.1:8000/request-a-solution/",
        {
          title: e.target[0].value,
          dataset_description: e.target[1].value,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res.data.Problem);

        dispatch(
          updateProblem({
            title: res.data.problem_title,
            description: res.data.datadescription,
            type: "Via Email",
            id: res.data.Problem,
            firstVisit: false,
          })
        );
      })
      .catch((err) => {
        console.log(headers);
        console.log(err);
      });
  };

  return !firstVisit ? (
    <section className="HomePage_PromptData">
      {/* <div className="main_container_earth">
                <div className="DataForm">
                    <h1>Form</h1>
                </div>
                <div className="container_Earth_animate">
                    <div className="loaderEarth"><span></span></div>
                    < div class="earth_main">
                    </div>
                </div>
          </div> */}
      <div className="Form_container">
        <h1> Step 1: Define Problem</h1>

        <form onSubmit={submitProblem}>
          <div className="form-group-problem">
            <label>Problem Title</label>
            <input type="text" className="form-control" />
            {/* <small className="text-danger">Name is required.</small> */}
          </div>

          <div className="form-group-problem">
            <label>Problem Description</label>
            <input type="text" className="form-control" />
            {/* <small className="text-danger">Name is required.</small> */}
          </div>

          <button
            type="submit"
            className="btn btn-block btn-danger"
            // onClick={dumpData}
          >
            Create Problem
          </button>
        </form>
      </div>
    </section>
  ) : (
    <section className="HomePage">{console.log(problem)}</section>
  );
}

// export default HomePage;
