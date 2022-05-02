import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";


const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const formhandler = (e) => {
    e.preventDefault();
    axios
      .post(`/users/sign_in`, { email, password })
      .then((res) => {
        // console.log(res.data)
        Cookies.set('userEmail',res.data.email)
        Cookies.set('authToken',res.data.authentication_token)
        localStorage.setItem('userData', JSON.stringify(res.data));
        alert("User was successfully signed in.")
        navigate("/profile");
        window.location.reload();
      })
      .catch((err) => {
        alert("You can't log in due to an error" + err);
        window.location.reload();
      });
  };
  return (
    <div >
    <div
      className="card container my-5 "
      style={{
        border: "5px solid #4bcfff",
        borderRadius: "5px",
        padding: "10px",
        width: "100%",
        marginLeft: "100px",
        marginTop: "20px",
      }}
    >
      <h3
        className="card-header"
        style={{
          backgroundColor: "#4bcfff",
          margin: "5px",
          width: "100%",
          border: "2px solid black",
        }}
      >
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

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/">
            <button className="btn btn-primary m-2">Home</button>
          </Link>
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
  );
};
export default SignIn;
