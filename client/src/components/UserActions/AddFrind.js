import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Layout/Header";
import Cookies from "js-cookie";
import FriendList from "./FriendList";
const AddFriend = (props) => {
  const [userData, setUserData] = useState({});
  const [friends, setFriends] = useState([]);

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
        setFriends(response.data)
        console.log(response.data);
      });
  }, []);
  return (
    <div>
      <Header image={false}></Header>
      <FriendList friends={friends}></FriendList>
    </div>
  );
};

export default AddFriend;
