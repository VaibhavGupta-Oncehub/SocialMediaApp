import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header'
import Post from './components/Posts/Post';

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
      <Header ></Header>
      <main>
        {postlist}
      </main>
    </div>
  );
}

export default App;
