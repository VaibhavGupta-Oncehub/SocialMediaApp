import { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Header from "../Layout/Header";

const FriendRequestsLists = (props) => {
  const [friendRequests, setFriendRequest] = useState([]);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header image={false}></Header>
      {friendRequests.length==0 && <h1>no friends requests</h1>}
      {friendRequests.map((friend) => {
        return (
          <div className="container mx-5 " key={friend.id}>
            <ul className="list-group m-1">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {friend} send you a friend Request 
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      props.friendRequestHandler(friend.id);
                    }}
                    className="btn btn-danger"
                  >
                    Accept request
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      props.friendRequestHandler(friend.id);
                    }}
                    className="btn btn-success"
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
