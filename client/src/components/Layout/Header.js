import { Fragment, useEffect, useState } from "react";
import mealsImage from "../../assets/meals2.jpg";
import classes from "./Header.module.css";
import Button from "../UI/Button";
import Cookies from "js-cookie";
import axios from "axios";
const Header = (props) => {
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
    }).then(res=>{
      Cookies.remove('userEmail')
      Cookies.remove('authToken')
      localStorage.removeItem('userdata')
      localStorage.removeItem("userPostsData");
      setStatus(!status)
    }).catch((err)=>{
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            SOCIAL
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/profile">
                      profile
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            {status ? (
              <div className="d-flex">
                <Button
                  label="Login"
                  className={classes.button}
                  path="/signin"
                ></Button>
                <Button
                  label="SignUp"
                  className={classes.button}
                  path="/SignUp"
                ></Button>
              </div>
            ) : (
              <button
                className={classes.button}
                onClick={() => {
                  logoutHandler();
                }}
              >
                Logout
              </button>
            )}
            {/* <button onClick={()=>{
              userStatusHandler()
            }}> check data</button> */}

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
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
