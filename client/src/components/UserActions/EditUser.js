/* eslint-disable no-unused-vars */
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";



var userInfo = [];


const getUserInfo = () => {
  const current_user = localStorage.getItem("userData");
  userInfo = JSON.parse(current_user);
  console.log("current user token: " + userInfo.id);
};

const EditUser = () => {
  getUserInfo();
  // console.log(userInfo)
  const [id, setId] = useState(userInfo.id);
  const [firstName, setFirstName] = useState(userInfo.first_name);
  const [lastName, setLastName] = useState(userInfo.last_name);
  const [userName, setUserName] = useState(userInfo.username);
  const [gender, setGender] = useState(userInfo.gender)
  const [age, setAge] = useState(userInfo.age)
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  let navigate = useNavigate();
  const validateData = () => {
    if (firstName !== "" && firstName !== null && firstName.length >= 1 && lastName !== null && lastName.length >= 1 && lastName !== "" && userName !== null && userName.length >= 1 && userName !== "" && email !== null && email !== "" && age >= 0 && age < 100 && (gender === "Male" || gender === "Female") && (password.length === confirmPassword.length) && password === confirmPassword && password !== null && password !== "" && confirmPassword !== null && confirmPassword !== "") {
      return true
    } else {
      return false
    }
  }
  const editUserRequestHandler = (e) => {
    e.preventDefault();
    const isValid = validateData();
    if (isValid) {
      const userToken = Cookies.get("authToken");
      const userEmail = Cookies.get("userEmail");
      const headers = {
        "Content-Type": "multipart/form-data",
        "X-User-Email": userEmail,
        "X-User-Token": userToken,
      };

      let formData = new FormData();
      formData.append("id",id);
      formData.append("first_name",firstName);
      formData.append("last_name", lastName);
      formData.append("gender", gender);
      formData.append("username",userName);
      formData.append("age", age);
      formData.append("email",email);
      formData.append("password",password);
      formData.append("password_confirmation", confirmPassword);

      axios.put("http://localhost:3000/users", formData, { headers: headers }).then((response) => {
        console.log("edit request sent", response);
        alert("User was successfully updated");
        navigate("/profile")
        window.location.reload();
      }).catch((error) => {
        console.log("error", error)
        alert("User can't be updated due to an error", error);
      })


    } else {
      alert("Please enter valid information.");
      window.location.reload();
    }
  }
  return (
    <Card
      className="text-center container"
      border="info"
      text="dark"
      style={{ width: "100%", height: "900px", border: "2px solid" }}
    >
      <Card.Header className="display-4">Edit User</Card.Header>
      <Card.Body>
        <Form
          encType="multipart/form-data"
          onSubmit={(e) => {
            editUserRequestHandler(e);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              defaultValue={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPasswordConfirmation"
          >
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              defaultValue={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
            <Form.Text className="text-muted">
              Type your password again.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              defaultValue={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              defaultValue={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              defaultValue={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="gender">Gender</Form.Label>
            <Form.Select
              id="Gender"
              required
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              minimum="0"
              maximum="100"
              defaultValue={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
    </Card>
  );

}

export default EditUser;