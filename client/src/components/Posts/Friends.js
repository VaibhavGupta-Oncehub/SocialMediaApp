import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import axios from "axios";
import FriendProfile from "../Friends/FriendProfile";

const Friends = (props) => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [update, setUpdate] = useState("");

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
        navigate("/profile");
        console.log("current user friends ==", response.data);
      });
  }, []);

  const removeFriend = async (id) => {
    const current_user = JSON.parse(localStorage.getItem("userData")).id;
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    await axios
      .delete("/removefriend/" + id + "/" + current_user, {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        alert("There was an error while signing out: " + err.message);
      });
    await axios
      .delete("/removefriend/" + current_user + "/" + id, {
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
    navigate("/profile");
  };

  const FriendProfile = (id) => {
    console.log(id);
    navigate("/friendprofile", { id: id });
  };

  const blockFriend = async (id) => {
    const current_user = JSON.parse(localStorage.getItem("userData")).id;
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");

    await axios
      .patch(
        "/block/" + id + "/" + current_user,
        {},
        {
          headers: {
            "X-User-Token": token,
            "X-User-Email": userEmail,
          },
        }
      )
      .then((response) => {
        window.location.reload(false);

      })
      .catch((error) => {
      });
  };
  const unblockFriend = async (id) => {
    const current_user = JSON.parse(localStorage.getItem("userData")).id;
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");

    await axios
      .patch(
        "/unblock/" + id + "/" + current_user,
        {},
        {
          headers: {
            "X-User-Token": token,
            "X-User-Email": userEmail,
          },
        }
      )
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        // Code
      });
  };

  return (
    <>
      {friends.map((friend) => {
        return (
          <div className="container mx-5 " key={friend.id}>
            <ul className="list-group m-1">
              {update}
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {friend.first_name}
                {friend.id}
                <div>
                  {friend.block == 1 && (
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          unblockFriend(friend.id);
                        }}
                        className="btn btn-info m-2"
                      >
                        unblock
                      </button>
                    </div>
                  )}
                  {friend.block == 0 && (
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          navigate("/friendprofile", {
                            state: { id: friend.id },
                          });
                        }}
                        className="btn btn-info m-2"
                      >
                        Show profile
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          blockFriend(friend.id);
                        }}
                        className="btn btn-warning m-2"
                      >
                        Block
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      removeFriend(friend.id);
                    }}
                    className="btn btn-danger m-2"
                  >
                    Remove friends
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

export default Friends;
