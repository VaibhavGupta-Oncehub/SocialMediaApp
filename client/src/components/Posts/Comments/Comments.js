/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Cookies from "js-cookie";
import axios from "axios";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import EditComment from "./EditComment";

const Comments = (props) => {
  let postComments = props.comments;
  const commentsUsersInfo = props.commentsUsersInfo;
  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [editComment, setEditComment] = useState({});


  const addNewCommentHandler = () => {
    const current_user = localStorage.getItem("userData");
    const user_id = current_user[6];
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "Content-Type": "multipart/form-data",
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };

    let formData = new FormData();
    formData.append("body", newComment);
    formData.append("user_id", user_id);
    console.log("formData: " + formData);
    let url = "http://localhost:3000/posts/" + props.post_id + "/comments";
    axios
      .post(url, formData, { headers: headers })
      .then((response) => {
        alert("Comment was created successfully.")
        window.location.reload();
      })
      .catch((error) => {
        alert("There was an error creating the comment"+error.message)
      });
  };

  const setCommetUserName = (comment_id) => {
    let user = commentsUsersInfo.find(
      (object) => object.comment_id === comment_id
    );
    if (user === undefined) {
      return "User";
    } else {
      return user.user_info.username.toLowerCase();
    }
  };

  const showEditCommentModalHandler = (comment) => {
    setEditComment(comment);
  }

  const deleteCommentHandler = (comment) => {
     const userToken = Cookies.get("authToken");
     const userEmail = Cookies.get("userEmail");
     const headers = {
       "X-User-Email": userEmail,
       "X-User-Token": userToken,
     };
    let url = "http://localhost:3000/posts/"+comment.post_id+"/comments/"+comment.id;
    axios.delete(url,{headers:headers}).then(response => {
      alert("Comment was deleted successfully.")
      console.log(response.data)
      window.location.reload();
    }).catch(error => {
      alert("Comment could not be deleted successfully." + error.message);
      window.location.reload();
    });
  }


  return (
    <div>
      {show && (
        <EditComment show={show} setShow={setShow} editComment={editComment} userName={setCommetUserName(editComment.id)}/>
      )}
      <hr />
      <h3> Comments</h3>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-right align-items-right flex-row muted-color">
          <span className="text-black">
            Total Comments: {props.comments.length}
            <span>
              <Button
                className="f-flex"
                variant="link"
                size="sm"
                style={{ marginLeft: "30px", marginBottom: "4px" }}
                onClick={() => {
                  setShowAddComment(!showAddComment);
                }}
              >
                Add a Comment
              </Button>
            </span>
          </span>
        </div>
      </div>
      {showAddComment && (
        <div className="comment-input m-2">
          <hr />
          <Form onSubmit={addNewCommentHandler}>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
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
      <hr />
      {postComments.map((comment) => {
        return (
          <div key={comment.id}>
            <div className="comments m-3">
              <div className="d-flex flex-row mb-2">
                <img
                  src="https://www.pinclipart.com/picdir/big/559-5594866_necktie-drawing-vector-round-avatar-user-icon-png.png"
                  width="40"
                  className="rounded-image"
                />
                <div className="f-flex flex-column m-2">
                  <span className="name">
                    {setCommetUserName(comment.id)} |{" "}
                  </span>
                  <small className="comment-text">{comment.body}</small>
                  <div className="d-flex flex-row align-items-center status">
                    <small>Like</small>
                    <small>Dislike</small>
                    <small>Reply</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="f-flex">
              <ButtonGroup size="sm" style={{ margin: "5px" }}>
                <Button variant="danger" style={{ margin: "5px" }} onClick={() =>{
                  let isDelete = confirm("Are you sure you want to delete this comment?");
                  if (isDelete) {
                    deleteCommentHandler(comment);
                  } else {
                    window.location.reload();
                  }
                }}>
                  Delete Comment
                </Button>
                <Button
                  variant="success"
                  style={{ margin: "5px" }}
                  onClick={() => {
                    handleShow();
                    showEditCommentModalHandler(comment);
                  }}
                >
                  Edit Comment
                </Button>
              </ButtonGroup>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
