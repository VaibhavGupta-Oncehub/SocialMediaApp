import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
const Reply = (props) => {
  const handleClose = () => props.setShowReply(false);
  const comment = props.comment;
  const originalUser = props.originalUser;
  const [body, setBody] = useState("");
 
  const addReplyToCommentHandler = (e) => {
    e.preventDefault();
    const current_user = JSON.parse(localStorage.getItem("userData"))
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };

    let formData = new FormData();
    formData.append("user_id", comment.user_id);
    formData.append("parent_comment_id", comment.id);
    formData.append("body", body);
    formData.append("user_name",current_user.username);

    let url = "http://localhost:3000/posts/" + comment.post_id + "/comments/" + comment.id + "/reply";
    axios.post(url, formData, { headers: headers }).then(response => {
      alert("Reply was successfully done.");
      window.location.reload();
      
    }).catch(err => {
      alert("There was something wrong while replying to the comment. " + err.message);
    })
  };

  return (
    <>
      <Modal
        show={props.setShowReply}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Reply to the Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ border: "1px solid" }}>
            <Card.Body>
              <strong>{originalUser.toUpperCase()} | </strong>
              {comment.body}.
            </Card.Body>
          </Card>
          <Form className="mt-3" onSubmit={(e) => addReplyToCommentHandler(e)}>
            <Form.Group className="mb-3" controlId="replyComment">
              <Form.Label>Reply</Form.Label>
              <Form.Control type="text" rows={3} required={true} onChange={(e) => setBody(e.target.value) }/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Post Reply
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Reply;
