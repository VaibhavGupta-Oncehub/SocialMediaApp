import { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Header from "../Layout/Header";
import { useNavigate } from "react-router";

const FriendRequestsLists = (props) => {
  const [friendRequests, setFriendRequest] = useState([]);
  const navigate = useNavigate();
  const acceptRequestHandler = async (id, requeste_id) => {
    const current_user = JSON.parse(localStorage.getItem("userData")).id;
    await axios
      .post(`/friends`, { friend: { user_id: current_user, friend_id: id } })
      .then((res) => {
        // console.log(res)
        alert("friend request accepted ");
        navigate("/profile");
      })
      .catch((err) => {
        alert("friend request can be added " + err);
      });

    await axios
      .post(`/friends`, { friend: { user_id: id, friend_id: current_user } })
      .then((res) => {
        // console.log(res)
        // navigate("/signin", {
        //   state: {
        //     messageStatus: "success",
        //     message:
        //       "User Successfully created, a confirmation mail is send to you email please click confirm email ",
        //   },
        // });
      })
      .catch((err) => {
        alert("friend request can be added " + err);
      });

    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    alert("request deleted ");
    await axios
      .delete("/friend_requests/"+requeste_id, {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        alert("There was an error while signing out: " + err.message);
      });
  };

  const deleteRequestHandler = (id) => {
    alert(id);
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    alert("request deleted ");
    axios
      .delete("/friend_requests/" + id, {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert("There was an error while signing out: " + err.message);
      });
  };

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem("userData")).id;
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    axios
      .get("http://localhost:3000/requests/" + current_user, {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then((res) => {
        console.log("the friend request", res.data);
        setFriendRequest(res.data);
        // setFriendRequest(res.data[0].username)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header image={false}></Header>
      {friendRequests.length == 0 && <h1>no friends requests</h1>}
      {friendRequests.map((friend) => {
        return (
          <div className="container mx-5 " key={friend.requeste_id}>
            <ul className="list-group m-1">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {friend.username} send you a friend Request
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      acceptRequestHandler(friend.user_id, friend.requeste_id);
                    }}
                    className="btn btn-success"
                  >
                    Accept request
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteRequestHandler(friend.requeste_id);
                    }}
                    className="btn btn-danger mx-2"
                  >
                    Delete request
                  </button>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default FriendRequestsLists;
