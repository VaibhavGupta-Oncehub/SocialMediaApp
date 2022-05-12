import { useLocation } from "react-router";
import Header from "../Layout/Header";
import "./DirectChat.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const DirectChat = (props) => {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { user_id, friend_id } = state;
  const [message, setMessage] = useState("");
  const [userMessage, setUserMessages] = useState([]);
  const chat = {
    user_id,
    friend_id,
    message,
  };

  const current_user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
    axios
      .get("/messages/" + friend_id, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        setUserMessages(response.data);
      })
      .catch((error) => {
        console.log("Error in get All Post Request: " + error);
        // alert("Unable to fetch all posts.")
      });
  }, []);
  const formHandler = (e) => {
    e.preventDefault();
    console.log(user_id, friend_id, message);
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    axios
      .post(`/chats`, {
        chat,
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false)
      })
      .catch((err) => {
        // navigate("/signin", {
        //   state: {
        //     messageStatus: "error",
        //     message: "User Not found please try again ",
        //   },
        // });
      });
  };
  return (
    <>
      <Header></Header>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <a
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#view_info"
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        alt="avatar"
                      />
                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">{current_user.username}</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>
                  <div className="col-lg-6 hidden-sm text-right">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-secondary"
                    >
                      <i className="fa fa-camera" />
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-primary"
                    >
                      <i className="fa fa-image" />
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-info"
                    >
                      <i className="fa fa-cogs" />
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-outline-warning"
                    >
                      <i className="fa fa-question" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="chat-history">
                {userMessage.map((message) => {
                  if (user_id != message.friend_id) {
                    return (
                      <ul className="m-b-0">
                        <li className="clearfix">
                          <div className="message other-message float-right">
                            {message.message}
                          </div>
                        </li>
                      </ul>
                    );
                  } else {
                    return (
                      <ul>
                        <li className="clearfix">
                          <div className="message-data">
                            <span className="message-data-time">
                              {message.user.username}
                            </span>
                          </div>
                          <div className="message my-message">
                            {message.message}
                          </div>
                        </li>
                      </ul>
                    );
                  }
                })}
              </div>
              <form onSubmit={formHandler}>
                <div className="chat-message clearfix">
                  <div className="input-group mb-0">
                    <input
                      type="text"
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      className="form-control"
                      placeholder="Enter text here..."
                    />
                    <div className="input-group-prepend">
                      <button className="input-group-text">
                        <i className="fa fa-send" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectChat;
