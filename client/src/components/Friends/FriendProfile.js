import Header from "../Layout/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const FriendProfile = (props) => {
  let navigate = useNavigate();
  const [userInfo,setUserInfo]=useState({})
  const { state } = useLocation();
  const { id } = state;

  useEffect(() => {
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
    axios
      .get("/users/"+id, {
        headers: headers,
      })
      .then((response) => {
        // console.log(
        //   "Get All Post Request's Response: " + JSON.stringify(response.data)
        // );
        console.log(response.data)
        setUserInfo(response.data)
      })
      .catch((error) => {
        console.log("Error in get All Post Request: " + error);
        // alert("Unable to fetch all posts.")
      });
  }, []);

  return (
    <div>
      <Header image={true}></Header>
      <div className="card box ">
        <div className="card-body">
          <div className="image">
            <span>
              <img
                id="userimage"
                src="https://www.pinclipart.com/picdir/big/559-5594866_necktie-drawing-vector-round-avatar-user-icon-png.png"
              />
            </span>
          </div>

          <h5 className="card-title m-3 text-center ">
            {(userInfo.first_name + " " + userInfo.last_name).toUpperCase()}
          </h5>
          <h6 className="card-subtitle mb-2 text-center">
            UserName: {userInfo.username}{userInfo.block}
          </h6>
          <h6 className="card-text text-center">
            Email: {userInfo.email}
          </h6>

          <h6 className="card-subtitle mb-2 text-center">Gender: {userInfo.gender}</h6>
          <h6 className="card-text text-center">Age: {userInfo.age}</h6>
          <div className=" text-center ">
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
