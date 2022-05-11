import Header from "../Layout/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const FriendProfile = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
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
      .get("/usersfriend/" + id, {
        headers: headers,
      })
      .then((response) => {
        console.log(" in the resou");
        setError(false);
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((e) => {
        console.log(" in the catch block ");
        console.log(e.body);
        setError(true);
      });

    axios
      .get("http://localhost:3000/user_posts/" + id, {
        headers: headers,
      })
      .then((response) => {
        console.log(" all the posts ");
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("Error in get All Post Request: " + error);
      });
  }, []);

  return (
    <div>
      {error && (
        <div>
          <Header image={false}></Header>
          <h1>page not found</h1>
        </div>
      )}

      {!error && (
        <div>
          <Header image={true}></Header>
          <div className="card box ">
            <div className="card-body">
              <div className="image">
                <span>
                  <img
                    id="userimage"
                    alt="loding"
                    src="https://www.pinclipart.com/picdir/big/559-5594866_necktie-drawing-vector-round-avatar-user-icon-png.png"
                  />
                </span>
              </div>

              <h5 className="card-title m-3 text-center ">
                {(userInfo.first_name + " " + userInfo.last_name).toUpperCase()}
              </h5>
              <h6 className="card-subtitle mb-2 text-center">
                UserName: {userInfo.username}
                {userInfo.block}
              </h6>
              <h6 className="card-text text-center">Email: {userInfo.email}</h6>

              <h6 className="card-subtitle mb-2 text-center">
                Gender: {userInfo.gender}
              </h6>
              <h6 className="card-text text-center">Age: {userInfo.age}</h6>
              <div className=" text-center "></div>
            </div>
          </div>

          <div>
            {posts.map((post) => {
              return (
                <div className="container mt-5 mb-5 space">
                  <div className="row d-flex align-items-center justify-content-center ">
                    <div className="col-md-6 ">
                      <div className="card summary">
                        <div className="d-flex justify-content-between p-2 px-3">
                          <div className="d-flex flex-row align-items-center">
                            <img
                            alt="loading"
                              src="https://www.pinclipart.com/picdir/big/559-5594866_necktie-drawing-vector-round-avatar-user-icon-png.png"
                              width="50"
                              className="rounded-circle"
                            />
                            <div className="d-flex flex-column ml-2">
                              <strong className="font-weight-bold">
                                {post.title.toUpperCase()}
                              </strong>
                            </div>
                          </div>
                        </div>
                        <img
                          src={post.image.url}
                          className="img-fluid background-image"
                        />
                        <div className="p-2">
                          <strong className="text-justify">
                            {post.description.toUpperCase()}
                          </strong>
                        </div>
                        <div
                          className="btn-group"
                          role="group"
                          style={{ margin: "5px", padding: "5px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendProfile;
