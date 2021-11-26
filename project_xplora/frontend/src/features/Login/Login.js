/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef } from "react";
import "./Login.css";
import axios from "axios";
import STARS from "./stars.png";
import { useSelector, useDispatch } from "react-redux";
import { setUserCredentials, logOutUser, updateProblem } from "./LoginSlicer";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
export default function Login(stat) {
  const [newUserdata, setNewUserData] = React.useState({
    user: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    profession: "",
    Name_of_Organization: "",
  });

  const [loginUserData, setLoginUserData] = React.useState({
    username: "",
    password: "",
  });

  // const notificationReference = React.createRef();

  const [notification, setNotification] = React.useState({
    visible: false,
    text: "User Created Successfully, Please Login.",
    type: "",
  });

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }

    setNotification({
      visible: false,
      text: "",
      type: "",
    });
  };

  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const didMountRef = useRef(false);
  const didMountRefII = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      console.log("skipp");
    } else {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/login/",
        data: loginUserData,
      })
        .then((res) => {
          console.log("here in response block", res);
          const isProblemCreated = res.data.areProblemsCreated;

          dispatch(
            setUserCredentials({
              username: res.data.username,
              isAuthorized: true,
              token: res.data.token,
            })
          );

          if (isProblemCreated) {
            //THIS IS THE RES OF LOGIN-PROBLEMLIST
            // problem.dataset_description: "My Ex cription"
            // problem.pk: 7
            // problem.title: "new Title"
            // problem_stage_data:
            // isActivated: true
            // isComplete: false
            // s_number: 1
            // stage.pk: 8
            // state: "GREEN"

            dispatch(
              updateProblem({
                ...res.data.problem_list[0],
                type: "Email",
              })
            );

            console.log("Problem ");
          }
          // if (res.data.problem_list.length) {
          //   const headers = {
          //     Authorization: `token ${res.data.token}`,
          //   };

          //   console.log(headers);
          //   const problem = res.data.problem_list[0];
          //   const problemKey = problem["problem.pk"];

          //   axios({
          //     method: "get",
          //     url: `http://127.0.0.1:8000/prob-detail/${problem["problem.pk"]}/`,
          //     headers: headers,
          //   }).then((res) => {
          //     dispatch(
          //       updateProblem({
          //         title: res.data.title,
          //         description: res.data.dataset_description,
          //         type: "Via Email",
          //         id: problemKey,
          //         firstVisit: false,
          //       })
          //     );

          //     console.log("we got problem description: ", res);
          //   });
          // }
        })
        .catch((err) => {
          console.log("here in error catched");
          console.log(loginUserData);
          console.log("error:", err);
          setNotification({
            visible: true,
            text: "Login Failed, please try again",
            type: "failure",
          });
        });
    }
  }, [dispatch, loginUserData]);

  useEffect(() => {
    if (!didMountRefII.current) {
      didMountRefII.current = true;
      console.log("skippII");
    } else {
      console.log(newUserdata);
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/register/",
        data: newUserdata,
      })
        .then((e) => {
          setNotification({
            visible: true,
            text: "User Created Successfully, Please Login.",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          setNotification({
            visible: true,
            text: "User not created, Please try again. ajaj",
            type: "failure",
          });
        });
    }
  }, [newUserdata]);

  const dumpDataCreate = (e) => {
    e.preventDefault();
    setNewUserData({
      user: {
        username: e.target[0].value,
        first_name: e.target[1].value,
        last_name: e.target[2].value,
        email: e.target[3].value,
        password: e.target[4].value,
      },
      profession: e.target[5].value,
      Name_of_Organization: e.target[6].value,
    });

    if (true) {
      // console.log(newUserdata);
      // axios({
      //   method: "post",
      //   url: "http://127.0.0.1:8000/register",
      //   data: newUserdata,
      // })
      //   .then((e) => {
      //     if (e.status === 201) {
      //       setNotification({
      //         visible: true,
      //         text: "User Created Successfully, Please Login.",
      //         type: "success",
      //       });
      //       e.target.reset();
      //     }
      //   })
      //   .catch((err) => {
      //     setNotification({
      //       visible: true,
      //       text: "User not created, Please try again.",
      //       type: "failure",
      //     });
      //   });
    }
  };

  const dumpDataLogin = (e) => {
    e.preventDefault();
    setLoginUserData({
      username: e.target[0].value,
      password: e.target[1].value,
    });

    // axios({
    //   method: "post",
    //   url: "http://127.0.0.1:8000/login/",
    //   data: loginUserData,
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       //set State
    //     } else {
    //       console.log(loginUserData);
    //       setNotification({
    //         visible: true,
    //         text: "Login Failed, please try again",
    //         type: "failure",
    //       });
    //       //setState
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(loginUserData);

    //     console.log("error:", err);
    //   });
  };

  return (
    <section id="Login">
      <img src={STARS} id="stars" />
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>
      <span id="shoot"></span>

      <div id="main_container">
        <div ref={node} className="notification" hidden={!notification.visible}>
          <h2 id="content_not">{notification.text}</h2>
        </div>
        <div id="r_container">
          <h2> Register</h2>

          <form onSubmit={dumpDataCreate}>
            <div className="form-group-l">
              <label>UserName</label>
              <input type="text" className="form-control" />
              {/* <small className="text-danger">Name is required.</small> */}
            </div>
            <div className="form-group-l">
              <label>First Name</label>
              <input type="text" className="form-control" />
              {/* <small className="text-danger">Name is required.</small> */}
            </div>
            <div className="form-group-l">
              <label>Last Name</label>
              <input type="text" className="form-control" />
              {/* <small className="text-danger">Name is required.</small> */}
            </div>
            <div className="form-group-l">
              <label>Email</label>
              <input type="email" className="form-control" />
            </div>

            <div className="form-group-l">
              <label>Password</label>
              <input type="password" className="form-control" />
            </div>

            <div className="form-group-l">
              <label>Profession</label>
              <input type="text" className="form-control" />
            </div>

            <div className="form-group-l">
              <label>Name of Organization</label>
              <input type="text" className="form-control" />
            </div>
            <br></br>
            <button
              type="submit"
              className="btn btn-block btn-danger"
              // onClick={dumpData}
            >
              Create User
            </button>
          </form>
        </div>

        <div id="l_container">
          <h2> Login</h2>
          <form onSubmit={dumpDataLogin}>
            <div className="form-group">
              <label>username</label>
              <input type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" />
            </div>

            <br></br>
            <button type="submit" className="btn btn-block btn-danger">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
