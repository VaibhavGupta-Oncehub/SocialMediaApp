import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import axios from "axios";
import Header from "../Layout/Header";

const MessageFriendList = (props) => {
  let [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const current_user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    axios
      .get("/friends", {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then(function (response) {
        setFriends(response.data);
        console.log("current user friends ==", response.data);
      });
  }, []);

  friends = [...new Set(friends.map((a) => JSON.stringify(a)))].map((a) =>
    JSON.parse(a)
  );
  return (
    <div>
      <Header image={false}></Header>
      {friends.map((friend) => {
        return (
          <div className="container mx-5 " key={friend.id}>
            <ul className="list-group m-1">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {friend.first_name}
                <div>
                  {friend.block == 1 && (
                    <div>
                      <button
                        type="button"
                        disabled
                        className="btn btn-info m-2"
                      >
                        Blocked
                      </button>
                    </div>
                  )}
                  {friend.block == 0 && (
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          navigate("/directchat", {
                            state: {
                              user_id: current_user.id,
                              friend_id: friend.id,
                            },
                          });
                        }}
                        className="btn btn-info m-2"
                      >
                        Chat
                      </button>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default MessageFriendList;
