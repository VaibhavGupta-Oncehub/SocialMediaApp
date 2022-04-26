import { Link } from "react-router-dom";

const SignUp = (props) => {
  return (
    <div>
      <div class="card container my-5 ">
        <h5 class="card-header d-flex justify-content-center">Sing Up</h5>
        <div className="container">
          <form>
            <div className="mb-3 m-2">
              <label htmlFor="exampleInputEmail1" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 m-2">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">Please enter the Valid email it will verify for further steps !!</div>
            </div>
            <div className="mb-3 m-2">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 m-2">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mx-1">
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
export default SignUp;
