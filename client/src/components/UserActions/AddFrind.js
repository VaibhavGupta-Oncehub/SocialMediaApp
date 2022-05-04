import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Layout/Header";
import Cookies from "js-cookie";
import FriendList from "./FriendList";
import { useNavigate } from "react-router-dom";

const AddFriend = (props) => {
  const [userData, setUserData] = useState({});
  const [friends, setFriends] = useState([]);
  const [friendRequest, setFriendRequest] = useState();
  let navigate = useNavigate();
  const current_user = JSON.parse(localStorage.getItem("userData")).id;

  const friendRequestHandler = (id) => {
    console.log("friend request id => ", id);
    console.log("current use id => ", current_user);
    const userEmail=Cookies.get('userEmail')
    const token=Cookies.get('authToken')
    const friend_request = {
      user_id: id,
      friend_id: current_user,
    };
    axios
      .post(`/friend_requests`, {
        friend_request,
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      });
  };

  useEffect(() => {
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    axios
      .get("/addfriend", {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then(function (response) {
        setFriends(response.data);
        console.log(response.data);
      });
  }, []);
  return (
    <div>
      <Header image={false}></Header>
      <FriendList
        friends={friends}
        friendRequestHandler={friendRequestHandler}
      ></FriendList>
    </div>
  );
};

export default AddFriend;
