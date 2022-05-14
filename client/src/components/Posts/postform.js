import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';

const PostForm = (props) => {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [image,setImage]=useState('null')
  let navigate = useNavigate();

  const formhandler=(e)=>{
    e.preventDefault() 
    const post={
      title: title,
      description: description,
      image: image
    }
    console.log("===================",image)
    axios.post(`http://localhost:3000/posts`,{post})
      .then(res => {
        console.log(res)
        navigate("/signin",{ state: { id: 7, color: 'green' } })
      }).catch(
        (err)=>{
          console.log(err)
        }
      )
  }
  return (
    <div className="">
      <div className="card container my-5 bg-info bg-opacity-25 ">
        <h5 className="card-header bg-info d-flex justify-content-center text-white">create post</h5>
        <div className="container">
          <form onSubmit={formhandler}>
            <div className="mb-3 m-2">
              <label htmlFor="exampleInputEmail1 " className="form-label text-dark">
                title
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e)=>setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3 m-2"> 
              <label htmlFor="exampleInputEmail1" className="form-label text-dark">
                discription
              </label>
              <input
                type="text"
                required
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e)=>setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label text-dark">
                image
              </label>
              <input type="file" accept="image/*" multiple={false} onChange={(e)=>{setImage(e.target.files[0])}} />
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
    </div>
  );
};
export default PostForm;
