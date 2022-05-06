import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import axios from "axios";

const Friends = (props) => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const removeFriend = async (id) => {
    const current_user = JSON.parse(localStorage.getItem("userData")).id;
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    await axios
      .delete("/removefriend/"+id+"/"+current_user, {
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
      await axios
      .delete("/removefriend/"+current_user+"/"+id, {
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
      navigate("/profile")

      
  };
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
        navigate("/profile")
        console.log("current user friends ==", response.data);
      });
  }, []);
  return (
    <>
    {friends.map((friend) => {
      return (
        <div className="container mx-5 " key={friend.id}>
          <ul className="list-group m-1">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {friend.first_name}{friend.id}
              <button
                type="button"
                onClick={() => {
                  removeFriend(friend.id)
                }}
                className="btn btn-danger"
              >
                Remove friends
              </button>
            </li>
          </ul>
        </div>
      );
    })}
  </>
  );
};

export default Friends;
