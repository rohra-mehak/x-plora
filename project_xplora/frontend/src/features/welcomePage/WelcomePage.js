/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import "./WelcomePage.css";
// import axios from "axios";
// import STARS from "./stars.png";
import { useSelector, useDispatch } from "react-redux";
import { updateProblem } from "../Login/LoginSlicer";
// import { setUserCredentials, logOutUser } from "./LoginSlicer";
import { useHistory, Route, Switch } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import MainPage from "../MainPage/MainPage";
export default function WelcomePage() {
  const isProblemCreated = useSelector(
    (state) => state.user.problem.isProblemCreated
  );

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

  // async function fetchUser() {
  //   const url = `http://127.0.0.1:8000/prob-detail/${ useSelector(state => { return state.user.problemId})}/`
  //   let response = await axios.get(url);
  //   return response.data;
  // }

  let problem = useSelector((state) => state.user.problem);

  // console.log("please check: ", problem);

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
        console.log("res from the problem crete", res);

        dispatch(
          updateProblem({
            problemPK: res.data.Problemn,
            problemDataset_description: res.data.datadescription,
            problemTitle: res.data.problem_title,
            type: "Email",
            problem_stage_data: {
              stagePk: res.data.stage_pk,
              isActivated: res.data.isActivated,
              isComplete: res.data.isComplete,
              s_number: res.data.s_number,
              state: res.data.state,
            },
          })
        );
      })
      .catch((err) => {
        console.log(headers);
        console.log(err);
      });
  };

  return (
    <Switch>
      <Route path="/createProblem">
        <section className="HomePage_PromptData" id="createProblem">
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
      </Route>

      <Route path="/main" component={MainPage} />
    </Switch>
  );
}
// export default HomePage;
