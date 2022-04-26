import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {
  useNavigate
  } from "react-router-dom";
const SignIn = (props) => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  let navigate = useNavigate();
  const formhandler=(e)=>{
    e.preventDefault() 

    axios.post(`http://localhost:3000/users/sign_in`,{email,password})
      .then(res => {
        console.log(res)
        navigate("/profile")
      }).catch(
        (err)=>{
          console.log(err)
        }
      )
  }
  return (
    <div class="card container my-5 ">
      <h5 class="card-header">Sing In</h5>
      <div className="container">
        <form onSubmit={formhandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              required
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/">
            <button className="btn btn-primary m-2">Home</button>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
