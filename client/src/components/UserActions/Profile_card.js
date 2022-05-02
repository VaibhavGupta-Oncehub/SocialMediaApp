/* eslint-disable jsx-a11y/alt-text */
import CreatePost from "../Posts/CreatePost";
import { useState, useEffect } from "react";
import EditUser from "../UserActions/EditUser";
import { useNavigate } from "react-router-dom";

var userInfo = [];

const getUserInfo = () => {
  const current_user = localStorage.getItem("userData");
  userInfo = JSON.parse(current_user);
  console.log("current user: " + userInfo);
};



const Profile_card = (props) => {
  
  getUserInfo();
  
  console.log(userInfo)
  
  const showFriendHandler = () => {
    props.setShowFriend(!props.showFriend);
  };

  let navigate = useNavigate();

  const [showNotEditAlert, setShowNotEditAlert] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);



  const CreatePostHandler = () => {
    const current_user = localStorage.getItem('userData')
    console.log(current_user)
    if (current_user != null) {
     setShowCreatePost(true);
    }
    else {
      setShowNotEditAlert(true);
    }
  };
  useEffect(() => {
    if (isClicked) {
      CreatePostHandler();
      setIsClicked(false);
    }
  }, [ isClicked]);
  return (
    <div>
      {showNotEditAlert && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            zIndex: "9999",
            borderRadius: "2px",
          }}
        >
          <strong>Warning!</strong> User should be signed in to create a new
          post.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setShowNotEditAlert(false);
            }}
          ></button>
        </div>
      )}
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
            UserName: {userInfo.username}
          </h6>
          <h6 className="card-text text-center">Email: {userInfo.email}</h6>

          <h6 className="card-subtitle mb-2 text-center">
            Gender: {userInfo.gender}
          </h6>
          <h6 className="card-text text-center">Age: {userInfo.age}</h6>
          <div className=" text-center ">
            <div>
              <button
                onClick={() => {
                  showFriendHandler();
                }}
                type="button"
                className="btn btn-primary mx-1"
              >
                {props.showFriend ? "Posts" : "Friends"}
              </button>
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={() => {
                  navigate("/edit_user");

                }}
              >
                Edit Profile
              </button>
              <button
                id="createPost"
                type="button"
                className="btn btn-primary mx-1"
                data-toggle="modal"
                data-target="#myPost"
                onClick={() => {
                  setIsClicked(true);
                }}
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
      {showCreatePost && <CreatePost setShowCreatePost={setShowCreatePost} />}
    </div>
  );
};

export default Profile_card;
