import { useState } from "react";
import Header from "../Layout/Header";
import Post from "../Posts/Post";
import "./Profile.css";
import Profile_card from "./Profile_card";
import Friends from "../Posts/Friends";
const DUMMY_POSTS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
  },
];
const Profile = (props) => {
  const [showFriend, setShowFriend] = useState(false);
  const postList = DUMMY_POSTS.map((post) => (
    <Post
      id={post.id}
      key={post.id}
      name={post.name}
      description={post.description}
    ></Post>
  ));
  return (
    <div>
      <Header></Header>
      <Profile_card
        showFriend={showFriend}
        setShowFriend={setShowFriend}
      ></Profile_card>
      {/* <div className="position">{postList}</div> */}
      {showFriend ? <Friends></Friends> :<div className="position">{postList}</div> }
      
    </div>
  );
};

export default Profile;
