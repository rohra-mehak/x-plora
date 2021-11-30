import React, { useEffect, useRef, useState } from "react";
import "./WelcomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { getWithExpiry, updateProblem } from "../Login/LoginSlicer";
import { useHistory, Route, Switch } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Problem from "../Problem/Problem";
import Login from "../Login/Login";
import MainPage from "../MainPage/MainPage";
export default function WelcomePage() {
  let userData = useSelector((state) => state.user);
  let isProblemCreated = getWithExpiry("problemId");

  useEffect(() => {
    console.log("Bhenchiod welcompage mounted");
    // isProblemCreated = getWithExpiry("problemId");
  }, []);

  console.log("starting fromt he bottom ", userData);

  const [editProblemVisibility, setEditProblemVisibility] = useState(
    !userData.problem.isProblemCreated
  );

  function submitted() {
    setEditProblemVisibility(false);
    console.log("move on");
  }

  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitProblem = (e) => {
    e.preventDefault();
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

        dispatch(updateProblem(res.data));
        history.push("./main");
      })
      .catch((err) => {
        console.log(headers);
        console.log(err);
      });
  };

  console.log(isProblemCreated);
  return isProblemCreated ? <MainPage /> : <Problem submitted={submitted} />;
}
// export default HomePage;

/*
<section className="HomePage_PromptData" id="createProblem">
        <div className="Form_container">
          <h1> Step 1: Define Problem</h1>

          <form onSubmit={submitProblem}>
            <div className="form-group-problem">
              <label>Problem Title</label>
              <input type="text" className="form-control" />
              {/* <small className="text-danger">Name is required.</small> }
              </div>

              <div className="form-group-problem">
                <label>Problem Description</label>
                <input type="text" className="form-control" />
                {/* <small className="text-danger">Name is required.</small> }
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
        <Switch>
          <Route path="/main/golgappa" component={MainPage} />
        </Switch>
*/
