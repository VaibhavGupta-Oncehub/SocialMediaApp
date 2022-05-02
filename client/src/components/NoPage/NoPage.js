/* eslint-disable jsx-a11y/anchor-is-valid */
const NoPage = () => {
  
  return (
    <div
      className="jumbotron container alert-danger"
      style={{
        border: "5px solid ",
        borderRadius: "5px",
        textAlign: "center",
        padding: "10px",
        width: "100%",
        marginLeft: "100px",
        marginTop: "20px",
      }}
    >
      <h1 className="display-3 ">Forbidden Route</h1>
      <p className="lead">Kindly go back.</p>
      <hr className="my-4" />
      <a className="btn btn-danger btn-lg" href="/" role="button">
        Go Back
      </a>
    </div>
  );
  
}
export default NoPage;