/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/img-redundant-alt */
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const EditPostModal = (props) => {
  const handleClose = () => props.setShow(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [image, setImage] = useState(null);
  const[upload,setUpload] = useState(false);
  let navigate = useNavigate();
  const EditPostRequestHandler = (e) => {
    e.preventDefault();
    
    let isEditRequested= confirm('Are you sure you want to edit this post?');

    if (isEditRequested) {
       const userToken = Cookies.get("authToken");
       const userEmail = Cookies.get("userEmail");
       const headers = {
         "Content-Type": "multipart/form-data",
         "X-User-Email": userEmail,
         "X-User-Token": userToken,
       };

       let formData = new FormData();
       formData.append("id", props.id);
       formData.append("title", title);
       formData.append("description", description);
       if (upload === true) {
         formData.append("image", image);
       }

       let url = "http://localhost:3000/posts/" + props.id;

       axios
         .put(url, formData, { headers: headers })
         .then((response) => {
           // console.log("Put Request Response: " + response);
           alert("Post was successfully edited.");
           window.location.reload();
         })
         .catch((error) => {
           alert("Post could not be edited due to some error: " + error);
         });
    } else {
      navigate("/profile")
      window.location.reload();
    }
  }
  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              <strong>Post Title</strong>
            </Form.Label>
            <Form.Control
              type="text"
              defaultValue={props.title}
              autoFocus
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              <strong>Post Description</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={props.description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              required={true}
            />
          </Form.Group>
          <h3 style={{ margin: "15px" }}>Post Image</h3>
          <img src={props.image.url} className="img-fluid background-image" />
          
          <div className="form-check form-switch" style={{ margin: "15px" }}>
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={upload} onChange={() => setUpload(!upload)}/>
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Upload Post Image</label>
          </div>
          { upload &&  <Form.Group controlId="formFile" className="mb-3">
              <Form.Label style={{ margin: "15px" }}>
                <h4>Edit Image| Choose another image</h4>
              </Form.Label>
              <Form.Control
                type="file"
                style={{ margin: "10px", size: "20px" }}
                accept="image/png,image/jpg,image/jpeg"
                multiple={false}
                onChange={(event) => {
                  setImage(event.target.files[0]);
                }}
                
              />
          </Form.Group>
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={(e) => {
            if (title === null || (upload === true && image === null) || description === null || title.length === 0 || description.length < 5 || description.length > 100 || title === "" || description === "") {
              alert("Please validate the fields properly");
            } else {
              EditPostRequestHandler(e);
              setUpload(!upload)
              handleClose();
            }
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPostModal;
