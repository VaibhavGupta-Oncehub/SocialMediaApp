import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ setShowCreatePost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  let navigate = useNavigate();

  const CreatePostRequesthandler = (e) => {
    e.preventDefault();

    const current_user = localStorage.getItem("userData");
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");

    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("user_id", current_user[6]);
    formData.append("image", image);

    const headers = {
      "Content-Type": "multipart/form-data",
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };

    axios
      .post("http://localhost:3000/posts", formData, { headers: headers })
      .then((response) => {
        // console.log("Post Request's Response: " + JSON.stringify(response));
        alert("Post was created successfully!");
        setShowCreatePost(false);
        navigate("/profile");
        window.location.reload();

      })
      .catch((error) => {
        // console.log("Error in Post Request", error);
        alert("There was some error in creating the post.");
      });
  };



  return (
    <div style={{ margin: "45px", border: "3px solid", padding: "5px" }}>
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={() => setShowCreatePost(false)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <h1 style={{ textAlign: "center", margin: "5px" }}>Create a Post</h1>

      <form
        className="needs-validation"
        onSubmit={CreatePostRequesthandler}
        encType="multipart/form-data"
      >
        <div
          className="form-group"
          style={{ marginTop: "15px", padding: "5px" }}
        >
          <label htmlFor="title" style={{ margin: "5px" }}>
            Post Title
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTitle"
            placeholder="Create a title"
            required
            onChange={(event) => setTitle(event.target.value)}
          ></input>
        </div>
        <div
          className="form-group"
          style={{ marginTop: "15px", padding: "5px" }}
        >
          <label htmlFor="title" style={{ margin: "5px" }}>
            Post Description
          </label>
          <input
            type="text"
            className="form-control"
            minimum="5"
            maximum="100"
            id="inputDescription"
            placeholder="Create a Description"
            style={{ margin: "5px" }}
            onChange={(event) => setDescription(event.target.value)}
            required
          ></input>
        </div>
        <div className="custom-file" style={{ margin: "15px" }}>
          <label className="custom-file-label" htmlFor="customFile">
            Choose an image
          </label>
          <br />
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            style={{ margin: "10px", size: "20px" }}
            accept="image/png,image/jpg,image/jpeg"
            multiple={true}
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
            required
          />
        </div>
        <button
          className="btn btn-primary btn-lg"
          type="submit"
          style={{ margin: "10px", textAlign: "center" }}
        
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;