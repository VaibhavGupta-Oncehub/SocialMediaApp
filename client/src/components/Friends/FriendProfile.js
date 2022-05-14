/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */

import Header from "../Layout/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Card from "react-bootstrap/Card";
import moment from "moment";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import EditComment from "../Posts/Comments/EditComment.js";
import Form from "react-bootstrap/Form";
import Reply from "../Posts/Comments/Reply.js";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const FriendProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const { state } = useLocation();
  const { id } = state;
  const [showReply, setShowReply] = useState(false);
  const [comments, setComments] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showPost, setShowPost] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [editComment, setEditComment] = useState({});
  const [newComment, setNewComment] = useState("");
  const [postId, setPostId] = useState(null);
  const [showAddComment, setShowAddComment] = useState(false);
  const [likes, setLikes] = useState([]);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [commentTobeReplied, setCommentTobeReplied] = useState({});

  const addNewCommentHandler = (e) => {
    e.preventDefault();
    const user_id = currentUser.id;
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };

    let formData = new FormData();
    formData.append("body", newComment);
    formData.append("user_id", user_id);
    formData.append("user_name", currentUser.username);

    let url = "http://localhost:3000/posts/" + postId + "/comments";
    axios
      .post(url, formData, { headers: headers })
      .then((response) => {
        alert("Comment was created successfully.");
        window.location.reload();
      })
      .catch((error) => {
        alert("There was an error creating the comment" + error.message);
      });
  };
  const showEditCommentModalHandler = (comment) => {
    setEditComment(comment);
  };

  const setCommetUserName = (comment) => {
    if (comment.user_name === undefined || comment.user_name === null) {
      return "User";
    } else {
      return comment.user_name.toUpperCase();
    }
  };

  let pointer = 0;
  const deleteCommentHandler = (comment) => {
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
    let url =
      "http://localhost:3000/posts/" +
      comment.post_id +
      "/comments/" +
      comment.id;
    axios
      .delete(url, { headers: headers })
      .then((response) => {
        alert("Comment was deleted successfully.");
        // console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        alert("Comment could not be deleted successfully." + error.message);
        window.location.reload();
      });
  };
  const getPostLikes = (ID) => {
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
    let url = "http://localhost:3000/user_posts/likes/" + ID;
    axios
      .get(url, { headers: headers })
      .then((response) => {
        setLikes(response.data);
      })
      .catch((error) =>
        alert(
          "Unable to fetch all likes of pots on your friend profile due to an error: " +
            error.message
        )
      );
  };
  const createLikeOnPostHandler = (e,id) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
     console.log(postId);
    let url =
      "http://localhost:3000/posts/" +
      id +
      "/postlikes/users/createlike/" +
      currentUser.id;
    axios
      .post(url, { headers: headers })
      .then((response) => {
        if (response.data.success === false) {
          alert("you have already liked the post.");
        } else {
          alert("Liked the post successfully");
          window.location.reload();
        }
      })
      .catch((error) =>
        alert("Unable to create a like on the post: " + error.message)
      );
  };

  const deleteLikeOnPostHandler = (e,id) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
    let url =
      "http://localhost:3000/posts/" +
      id +
      "/postlikes/users/deletelike/" +
      currentUser.id;
    axios
      .delete(url, { headers: headers })
      .then((response) => {
        if (response.data.success === true) {
          alert("Disliked the post successfully");
          window.location.reload();
        } else {
          alert("you have already disliked the post.");
        }
      })
      .catch((error) => alert("Unable to dislike the post: " + error.message));
  };
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
        setError(false);
        setUserInfo(response.data);
      })
      .catch((e) => {
        console.log(e.message);
        setError(true);
      });
    axios
      .get("http://localhost:3000/user_posts/" + id, {
        headers: headers,
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("Error in get All Post Request: " + error);
      });
    getFriendInfo();
    getPostLikes(id);
  }, []);

  const getFriendInfo = () => {
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };

    axios
      .get("http://localhost:3000/userfriend/info/" + id, { headers: headers })
      .then((response) => {
        setComments(response.data.comments);
        setFriends(response.data.friends);
      })
      .catch((err) => {
        alert("Unable to fetch your friend profile information" + err.message);
      });
  };

  return (
    <div>
      {error && (
        <div>
          <Header image={false}></Header>
          <h1>page not found</h1>
        </div>
      )}
      {show && (
        <EditComment
          show={show}
          setShow={setShow}
          editComment={editComment}
          userName={setCommetUserName(editComment.id)}
        />
      )}
      {!error && (
        <div>
          <Header image={true}></Header>
          <div className="card box" style={{ width: "100%", height: "100%" }}>
            <div className="card-body">
              <div className="image">
                <span>
                  <img
                    id="userimage"
                    alt="loading"
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
            </div>
            <div className="container text-center">
              {" "}
              <Button
                variant="warning"
                size="sm"
                onClick={() => setShowPost(!showPost)}
              >
                Show Post
              </Button>
            </div>
          </div>
          {showPost && (
            <div>
              <h1 className="text-center" style={{ margin: "20px" }}>
                {(userInfo.first_name + " " + userInfo.last_name).toUpperCase()}{" "}
                's POSTS
              </h1>
            </div>
          )}
          (
          {showPost && (
            <div
              className="container w-100 h-100"
              style={{ marginTop: "200px" }}
            >
              {posts.map((post) => {
                let replies = [];
                replies = comments[pointer].filter((comment) => {
                  return comment.parent_comment_id !== null;
                });
                let totalLikes = 0;
                totalLikes = likes[pointer].likes;

                return (
                  <div
                    key={post.id}
                    className="container mt-5 mb-5 space w-100 h-100"
                  >
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
                              <div className="d-flex flex-column ml-3">
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
                          <div className="p-2 text-center">
                            <strong className="text-justify">
                              {post.description.toUpperCase()}
                            </strong>
                          </div>

                          <div
                            className="container text-center w-50"
                            style={{
                              marginBottom: "15px",
                              textAlign: "center",
                              border: "2px solid",
                            }}
                          >
                            <strong>Total likes on post: {totalLikes} </strong>
                          </div>
                          <div className="container text-center">
                            <ButtonGroup className="container w-25" size="sm">
                              <Button
                                className="container"
                                variant="success"
                                style={{ marginRight: "5px" }}
                                onClick={(e) => {
                                  createLikeOnPostHandler(e,post.id);
                                }}
                              >
                                <FaThumbsUp />
                              </Button>
                              <Button
                                className="container"
                                variant="danger"
                                onClick={(e) => {
                                  setPostId(post.id);
                                  deleteLikeOnPostHandler(e,post.id);
                                }}
                              >
                                <FaThumbsDown />
                              </Button>
                            </ButtonGroup>
                          </div>

                          <div className="container">
                            <h3 className="text-center m-3"> Comments</h3>
                            <span> ➕ </span>
                            <Button
                              variant="link"
                              style={{ marginLeft: "3px", marginBottom: "3px" }}
                              onClick={() => {
                                setPostId(post.id);
                                setShowAddComment(!showAddComment);
                              }}
                            >
                              Add Comment
                            </Button>
                          </div>
                          {showAddComment && (
                            <div
                              className="comment-input m-2"
                              style={{
                                border: "2px solid",
                                margin: "3px",
                                padding: "3px",
                              }}
                            >
                              <h5>Add a New Comment</h5>
                              <Form onSubmit={(e) => addNewCommentHandler(e)}>
                                <Form.Group
                                  className="mb-3 mt-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter a comment"
                                    onChange={(e) => {
                                      setNewComment(e.target.value);
                                    }}
                                    required
                                  />
                                </Form.Group>
                                <Button
                                  variant="primary"
                                  type="submit"
                                  size="sm"
                                  style={{ marginBottom: "4px" }}
                                >
                                  Comment
                                </Button>
                              </Form>
                            </div>
                          )}

                          <hr style={{ border: "2px solid", margin: "5px" }} />
                          {comments[pointer++].map((comment) => {
                            return (
                              comment.parent_comment_id === null && (
                                <div
                                  key={comment.id}
                                  className="container w-100 h-100"
                                >
                                  {showReply && (
                                    <Reply
                                      showReply={showReply}
                                      setShowReply={setShowReply}
                                      comment={commentTobeReplied}
                                      originalUser={setCommetUserName(
                                        commentTobeReplied
                                      )}
                                    />
                                  )}
                                  <Card
                                    style={{
                                      border: "2px solid",
                                      margin: "5px",
                                    }}
                                  >
                                    <Card.Header>
                                      {comment.user_name}
                                    </Card.Header>
                                    <Card.Body>{comment.body}</Card.Body>
                                    <div className="d-flex flex-row status">
                                      {/* <small>
                                        <Button
                                          variant="link"
                                          size="sm"
                                          style={{
                                            marginRight: "auto",
                                            marginTop: "3px",
                                          }}
                                        >
                                          Like
                                        </Button>
                                      </small> */}
                                      <small>
                                        <Button
                                          variant="link"
                                          size="sm"
                                          style={{
                                            marginLeft: "auto",
                                            marginTop: "3px",
                                          }}
                                          onClick={() => {
                                            setShowReply(true);
                                            setCommentTobeReplied(comment);
                                          }}
                                        >
                                          Reply
                                        </Button>
                                      </small>
                                    </div>
                                    <Card.Footer>
                                      <span className="text-muted">
                                        Commented{" "}
                                        {moment(comment.updated_at).fromNow()}
                                      </span>
                                    </Card.Footer>
                                    {comment.user_id === currentUser.id && (
                                      <div
                                        id="actions"
                                        className="container text-center"
                                      >
                                        <ButtonGroup className="m-2" size="sm">
                                          <Button
                                            variant="warning"
                                            style={{ margin: "1px" }}
                                            size="sm"
                                            onClick={() => {
                                              handleShow();
                                              showEditCommentModalHandler(
                                                comment
                                              );
                                            }}
                                          >
                                            Edit Comment
                                          </Button>
                                          <Button
                                            variant="danger"
                                            style={{ margin: "1px" }}
                                            size="sm"
                                            onClick={() => {
                                              let isDelete = confirm(
                                                "Are you sure you want to delete this comment?"
                                              );
                                              if (isDelete) {
                                                deleteCommentHandler(comment);
                                              } else {
                                                window.location.reload();
                                              }
                                            }}
                                          >
                                            Delete Comment
                                          </Button>
                                        </ButtonGroup>
                                      </div>
                                    )}
                                  </Card>

                                  {replies.map((replycomment) => {
                                    return (
                                      replycomment.post_id === post.id &&
                                      comment.id ===
                                        replycomment.parent_comment_id && (
                                        <Card
                                          key={replycomment.id}
                                          style={{
                                            border: "1px solid",
                                            marginLeft: "35px",
                                            marginRight: "-15px",
                                            marginTop: "-5px",
                                          }}
                                        >
                                          <Card.Header>
                                            {replycomment.user_name}
                                          </Card.Header>
                                          <Card.Body>
                                            {replycomment.body}
                                          </Card.Body>
                                          <Card.Footer>
                                            <span className="text-muted">
                                              Replied{" "}
                                              {moment(
                                                replycomment.updated_at
                                              ).fromNow()}
                                            </span>
                                          </Card.Footer>
                                        </Card>
                                      )
                                    );
                                  })}
                                  <hr
                                    style={{
                                      border: "2px solid",
                                      margin: "5px",
                                    }}
                                  />
                                </div>
                              )
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          )
        </div>
      )}
    </div>
  );
};

export default FriendProfile;
