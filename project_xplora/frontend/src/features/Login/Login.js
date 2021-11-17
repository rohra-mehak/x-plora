import React from "react";
import "./Login.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
export default function Login() {
  const [data, setData] = React.useState({});
  const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

  const formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach((val) => {
      if (val.length > 0) {
        isValid = false;
      } else {
        isValid = true;
      }
    });

    Object.values(rest).forEach((val) => {
      if (val === null) {
        isValid = false;
      } else {
        isValid = true;
      }
    });

    return isValid;
  };

  return (
    <section id="Login">
      <div id="main_container">
        <div id="r_container">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" />
              <small className="text-danger">Name is required.</small>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="text" className="form-control" />
            </div>

            <button type="submit" className="btn btn-block btn-danger">
              Create User
            </button>
          </form>
        </div>
        <div id="l_container"></div>
      </div>
    </section>
  );
}
