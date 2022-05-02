/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from "react";
import mealsImage from "../../assets/meals2.jpg";
import classes from "./Header.module.css";
import Button from "../UI/Button";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Header = () => {
  let navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [userData, setUserData] = useState({});

  const logoutHandler = () => {
    localStorage.clear()
    const userEmail=Cookies.get('userEmail')
    const token=Cookies.get('authToken')
    axios.delete("http://localhost:3000/users/sign_out", {
      headers: {
        "X-User-Token": token,
        "X-User-Email": userEmail,
      },
    }).then(() => {
      Cookies.remove('userEmail')
      Cookies.remove('authToken')
      localStorage.removeItem('userdata')
      localStorage.removeItem("userPostsData");
      alert("User has been signed out.");
      setStatus(!status)
      navigate("/");
      window.location.reload();
      
    }).catch((err) => {
      alert("There was an error while signing out: " + err.message);
      setStatus(false)
    })
  };

  useEffect(() => {
    setUserData(localStorage.getItem("userData"));
    if(userData==null)
    {
      setStatus(true);
    }
    if(userData!=null)
    {
      setStatus(false);
    }
  }, [status]);

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary  ">
        <div className="container-fluid ">
          <a className="navbar-brand " href="/">
            SOCIAL MEDIA PLATFORM
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!status && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong style={{ color: "white" }}> Menu</strong>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/" style={{border: "1px solid", borderRadius: "5px", marginBottom: "5px"}}>
                        Home
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/profile">
                        User Profile
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
            {status ? (
              <div className="d-flex me-auto" style={{ margin: "10px" }}>
                <Button
                  label="Login"
                  className={classes.button}
                  path="/signIn"
                ></Button>
                <Button
                  label="SignUp"
                  className={classes.button}
                  path="/SignUp"
                ></Button>
              </div>
            ) : (
                <button
                  id="logoutButton"
                className={classes.button}
                onClick={() => {
                  logoutHandler();
                }}
              >
                Logout
              </button>
            )}

            <form className="d-flex ml-auto ">
              <input
                className="form-control me-3 form-control-lg "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className={classes.button} type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="image"></img>
      </div>
    </Fragment>
  );
};

export default Header;
