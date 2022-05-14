import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./App.css";
import Header from "./components/Layout/Header";



const App = () => {
  let navigate = useNavigate();
  const { state } = useLocation();
  let m=""
  let s=""
  useEffect(()=>{
    const userData = localStorage.getItem("userData");
    if (userData === null) {
      navigate("/signin", {
        state: {
          messageStatus: "error",
          message: "Please Login First  !!!!!!!!!!!!",
        }
      })
    }
  },[])

  useEffect(() => {
    console.log(state)
    if (state!=null) {
      console.log("changenig message")
      const { messageStatus, message } = state;
      m=messageStatus
      s=message
    }
  }, [state]);
  return (
    <div>
      <Header image={true} />
      <div
        className="jumbotron container"
        style={{
          border: "5px solid #4bcfff",
          borderRadius: "5px",
          textAlign: "center",
          padding: "10px",
          width: "100%",
          marginLeft: "auto",
          marginRight:"auto",
          marginTop: "20px",
        }}
      >
        <h1 className="display-3">Welcome to Social Media Platform</h1>
        <p className="lead">
          Now connect with your loved ones across the globe.
        </p>
        <hr className="my-4" />
        <p>Join the community of millions.</p>
      </div>
    </div>
  );
};

export default App;
