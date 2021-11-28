import React, { useEffect, useRef, useState } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProblem } from "../Login/LoginSlicer";
import "./Problem.css";
import axios from "axios";

function Problem(props) {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const submitted = props.submitted;
  const submitProblem = (e) => {
    e.preventDefault();

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
        dispatch(updateProblem(res.data.GeneratedProblemData));
        submitted();
      })
      .catch((err) => {
        console.log(headers);
        console.log(err);
      });
  };

  return (
    <div className="main_container">
      <div id="ll_container">
        <h2> Problem Details</h2>
        <form onSubmit={submitProblem}>
          <div className="lform-group">
            <label>Title</label>
            <input type="text" className="lform-control" />
          </div>

          <div className="lform-group">
            <label>Description</label>
            <input type="text" id="details" className="lform-control" />
          </div>

          <br></br>
          <button type="submit" className="btn btn-block btn-danger">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Problem;
