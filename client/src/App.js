import './App.css';
import Header from './components/Layout/Header'
import Post from './components/Posts/Post';
import { useState } from 'react';

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
function App() {
  const [userData,setUserData]=useState({})
  const postlist = DUMMY_POSTS.map((post) => (
    <Post
      id={post.id}
      key={post.id}
      name={post.name}
      description={post.description}
    ></Post>
  ));
  return (
    <div>
      <Header userData={userData} setUserData={setUserData}></Header>
      <main>
        {postlist}
      </main>
    </div>
  );
}

export default App;
