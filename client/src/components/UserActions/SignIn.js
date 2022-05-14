import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Alert from "../UI/Alert";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation();
  const { messageStatus, message } = state;
  let navigate = useNavigate();
  const formhandler = (e) => {
    e.preventDefault();
    axios
      .post(`/users/sign_in`, { email, password })
      .then((res) => {
        Cookies.set("userEmail", res.data.email);
        Cookies.set("authToken", res.data.authentication_token);
        localStorage.setItem("userData", JSON.stringify(res.data));
        navigate("/", {
          state: {
            messageStatus: "success",
            message: "User was successfully signed in",
          },
        });
      })
      .catch((err) => {
        navigate("/signin", {
          state: {
            messageStatus: "error",
            message: "User Not found please try again ",
          },
        });
      });
  };
  return (
    <>
      {state && <Alert message={message} messageStatus={messageStatus}></Alert>}
      <div className="container">
        <div className="card container my-5 bg-info bg-opacity-25">
          <h3 className="card-header bg-info d-flex justify-content-center text-white">
            Sign In
          </h3>
          <div className="container">
            <form onSubmit={formhandler}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label ">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  required
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary my-3">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="divider f-flex align-items-center">
          <h3 className="text-center fw-bold mx-3 mb-0 ">OR</h3>
        </div>
        <div className="text-center" style={{ margin: "15px" }}>
          <h4>Don't have an account?</h4>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/signup")}
            style={{ margin: "15px" }}
          >
            Sign Up
          </button>
        </div>
      </div>
    





      
    </>
  );
};
export default SignIn;
