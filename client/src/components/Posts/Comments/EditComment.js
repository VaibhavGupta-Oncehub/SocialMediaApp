import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const EditComment = (props) => {
  const handleClose = () => props.setShow(false);
  const comment = props.editComment;
  let post_id = comment.post_id;
  let comment_id = comment.id;
  const userName = props.userName;
  const [editedComment, setEditedComment] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  const editCommentHandler = () => {
    if (isEdited) {
      const userToken = Cookies.get("authToken");
      const userEmail = Cookies.get("userEmail");
      const headers = {
        "X-User-Email": userEmail,
        "X-User-Token": userToken,
      };
      let formData = new FormData();
      formData.append("body", editedComment);

      let url =
        "http://localhost:3000/posts/" + post_id + "/comments/" + comment_id;

      axios
        .put(url, formData, { headers: headers })
        .then((response) => {
          alert("Comment was successfully edited.");
          console.log(response.data);
        })
        .catch((err) => {
          alert("Comment failed to be edited. " + err.message);
        });
    } else {
      alert("You can't submit without editing.");
      window.location.reload();
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Comment ✏️ </Modal.Title>
      </Modal.Header>
      <Form autoFocus={true} onSubmit={editCommentHandler}>
        <Modal.Body>
          <h6>
            Commented by: <span>{userName}</span>
          </h6>
          <hr />
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              defaultValue={comment.body}
              onChange={(e) => {
                setIsEdited(true)
                setEditedComment(e.target.value);
              }}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Ok
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditComment;
