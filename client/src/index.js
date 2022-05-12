import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./components/UserActions/SignIn";
import SignUp from "./components/UserActions/SignUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Profile from "./components/UserActions/Profile";
import { CookiesProvider } from "react-cookie";
import NoPage from "./components/NoPage/NoPage";
import Header from "./components/Layout/Header";
import EditUser from "./components/UserActions/EditUser"
import AddFriend from "./components/UserActions/AddFrind";
import FriendRequestsLists from "./components/UserActions/FriendRequestsList";
import FriendProfile from "./components/Friends/FriendProfile";
import MessageFriendList from "./components/Friends/MessageFriendList";
import DirectChat from "./components/Messages/DirectChat";
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  
  <BrowserRouter>
    <div>
      <CookiesProvider>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/edit_user" element={<EditUser />} />
          <Route path="/addfriends" element={<AddFriend />} />
          <Route path="/friendrequests" element={<FriendRequestsLists />} />
          <Route path="/friendprofile" element={<FriendProfile />} />
          <Route path="/chatwithfriend" element={<MessageFriendList />} />
          <Route path="/directchat" element={<DirectChat />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </CookiesProvider>
    </div>
  </BrowserRouter>
);

reportWebVitals();
