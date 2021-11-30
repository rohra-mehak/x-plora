/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWithExpiry, logOutUser, updateProblem } from "../Login/LoginSlicer";
import EARTHGIF from "./Bharat.gif";
import "./MainPage.css";
import PEN from "./pen.png";
import * as stageHelper from "./utils.js";
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export default function MainPage() {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let problem = useSelector((state) => state.user.problem);
  let change = 1;
  function updateWithStore(para) {
    problem = para;
  }

  useEffect(() => {
    const problemKey = getWithExpiry("problemId");
    const token = getWithExpiry("token");
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
  }, [change, dispatch, updateWithStore]);

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

  const [editProblem, setEditProblem] = React.useState(false);

  function handleProblemEditSubmit(e) {
    const url = `http://127.0.0.1:8000/prob-detail/${
      getWithExpiry("problemId") || ""
    }/`;
    const payload = {};

    if (e.target[0].value) payload.title = e.target[0].value;
    if (e.target[1].value) payload.dataset_description = e.target[1].value;

    const headers = {
      Authorization: `token ${getWithExpiry("token") || ""}`,
    };

    console.log(payload, url, headers);
    console.log(url);

    console.log(headers);
    // console.log(payload{});

    if (payload.dataset_description || payload.title) {
      axios({
        method: "put",
        url: url,
        headers: headers,
        data: payload,
      })
        .then((res) => {
          console.log(res);
          setEditProblem(false);
        })
        .catch((err) => setEditProblem(false));
    }
    change = 2;
  }

  let loopIds = [1, 2, 3, 4, 5];

  return (
    <div className="MainPage" id="main">
      <header>
        <a href="." id="logo" className={activeTab.logo}>
          X-plora
        </a>
        <ul>
          <li>
            <a
              href="#Problem"
              id="problem"
              className={activeTab.problem}
              onClick={toggleClassName}
            >
              Problem
            </a>
          </li>
          <li>
            <a
              href="#Solution"
              id="solution"
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
            <img
              src={PEN}
              className="pen"
              onClick={() => {
                setEditProblem(true);
              }}
            />
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

        <div className="editProblemPopup" hidden={!editProblem}>
          <form onSubmit={handleProblemEditSubmit}>
            <div className="eform-group">
              <a
                id="close"
                onClick={() => {
                  setEditProblem(false);
                }}
              >
                x{" "}
              </a>
              <label id="edetails">Title</label>
              <input type="text" className="eform-control" />
            </div>

            <div className="eform-group">
              <label id="edetails">Description</label>
              <textarea type="text-area" className="eform-control" />
            </div>

            <br></br>
            <button type="submit" className="btn btn-block btn-danger">
              Save
            </button>
          </form>
        </div>

        <div className="container rotatingEarth">
          <img src={EARTHGIF} className="box" />
        </div>
      </section>

      <section id="Solution" className="Solution">
        <div className="StageContainer">
          {loopIds.map((id) => {
            let style = {
              // color: "aliceblue",
            };
            let stageDetails = problem.stageDetails;
            let state = stageDetails.state;
            // let isActivated = problem.stageDetails.isActivated;
            //lets fix Colours
            if (id === problem.stageDetails.stageNumber) {
              switch (state) {
                case "YELLOW":
                  style = stageHelper.isActiveYellow;
                  break;

                case "GREEN":
                  style = stageHelper.isActiveGreen;
                  break;

                case "RED":
                  style = stageHelper.isActiveRed;
                  break;

                default:
                  break;
              }
            } else if (id < problem.stageDetails.stageNumber) {
              style = stageHelper.isInactiveState;
            } else {
              style = stageHelper.isInactiveFresh;
            }

            let hidden = !(
              problem.stageDetails.isComplete && id === stageDetails.stageNumber
            );

            return (
              <div style={style} className="Stage">
                <div id="numberAndName">
                  <h5>{id}</h5>
                  <h4>{stageHelper.titles[id - 1]}</h4>
                </div>
                {/* <button hidden={hidden}>bhow</button> */}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
