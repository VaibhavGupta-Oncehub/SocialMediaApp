/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect } from "react";
import Post from "../Posts/Post";
import "./Profile.css";
import Profile_card from "./Profile_card";
import Friends from "../Posts/Friends";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../Layout/Header";
var posts = [];

const getAllPost = () => {
  const current_user = localStorage.getItem("userData");
  const userToken = Cookies.get("authToken");
  const userEmail = Cookies.get("userEmail");
  const headers = {
    "X-User-Email": userEmail,
    "X-User-Token": userToken,
  };
  axios
    .get("http://localhost:3000/user_posts/" + current_user[6], {
      headers: headers,
    })
    .then((response) => {
      // console.log(
      //   "Get All Post Request's Response: " + JSON.stringify(response.data)
      // );
      posts = JSON.parse(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log("Error in get All Post Request: " + error);
      // alert("Unable to fetch all posts.")
    });
};

const Profile = () => {
  const [showFriend, setShowFriend] = useState(false);

  useEffect(() => {
    getAllPost();
  }, [showFriend]);

  return (
    <>
      <Header image={true}/>
      <div>
        <Profile_card
          showFriend={showFriend}
          setShowFriend={setShowFriend}
          getAllPost={getAllPost}
        />
        {showFriend ? (
          <div className="text-center" style={{ margin: "25px" }}>
            <h1> My Friends</h1>
            <Friends></Friends>{" "}
          </div>
        ) : (
          <div className="text-center" style={{ margin: "25px" }}>
            <h1>My Posts</h1>
            <div className="position">
              {posts.map(function (post) {
                return (
                  <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    user={post.user_id}
                    image={post.image}
                    showFriend={showFriend}
                    setShowFriend={setShowFriend}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
