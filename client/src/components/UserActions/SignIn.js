import { Link } from "react-router-dom";

const SignIn = (props) => {
  return (
    <div class="card container my-5 ">
      <h5 class="card-header">Sing In</h5>
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
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
