import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = (props) => {
  const [username,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [age,setAge]=useState(0)
  const [gender,setGender]=useState("")
  const [password,setPassword]=useState("")
  const [passwordConfirmation,setPasswordConfirmation]=useState("")
  let navigate = useNavigate();

  const formhandler=(e)=>{
    e.preventDefault() 
    if(password !== passwordConfirmation)
    {
      console.log("password did not match to each other")
      return 0
    }if(age<=0)
    {
      console.log("Age is to small ")
      return 0
    }
    const user={
      email,
      first_name: firstName,
      last_name: lastName,
      username,
      age,
      gender,
      password,
      password_confirmation: passwordConfirmation
    }
    axios.post(`http://localhost:3000/users`,{user})
      .then(res => {
        // console.log(res)
        alert("User was successfully created.")
        navigate("/signin")
        window.location.reload();

      }).catch(
        (err) => {
          alert("User can't be created due to an error: " + err);
        }
      )
  }
  return (
    <div className="container">
      <div className="card container my-5 bg-info bg-opacity-25 ">
        <h5 className="card-header bg-info d-flex justify-content-center text-white">
          Sign Up
        </h5>
        <div className="container">
          <form onSubmit={formhandler}>
            <div className="mb-3 m-2">
              <label
                htmlFor="exampleInputUser1 "
                className="form-label text-dark"
              >
                User Name
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="exampleInputUser1"
                aria-describedby="emailHelp"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-3 m-2">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label text-dark"
              >
                Email address
              </label>
              <input
                type="email"
                required
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text ">
                Please enter the Valid email it will verify for further steps !!
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label text-dark"
              >
                First Name
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="firstName"
                aria-describedby="emailHelp"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label text-dark"
              >
                Last Name
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="lastName"
                aria-describedby="emailHelp"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label text-dark"
              >
                Age
              </label>
              <input
                type="number"
                required
                className="form-control"
                id="age"
                aria-describedby="emailHelp"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label text-dark"
              >
                Gender
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="gender"
                aria-describedby="emailHelp"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div className="mb-3 m-2">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-dark"
              >
                Password
              </label>
              <input
                type="password"
                required
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 m-2">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-dark"
              >
                Password confirmation
              </label>
              <input
                type="password"
                required
                className="form-control"
                id="passwordConfirmation"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <div className="d-flex m-3 justify-content-center">
              <button type="submit" className="btn btn-primary mx-1 ">
                Submit
              </button>
              <Link to="/">
                <button className="btn btn-primary ">Home</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="divider f-flex align-items-center">
        <h3 className="text-center fw-bold mx-3 mb-0 ">OR</h3>
      </div>
      <div className="text-center container" style={{ margin:"15px"}}>
        <h4>Already have an account?</h4>
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/signin")} style={{ margin:"15px"}}> Sign In</button>
      </div>
    </div>
  );
};
export default SignUp;
