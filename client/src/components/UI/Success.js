const Success = (props) => {
  return (
    <div className="alert alert-success" role="alert">
      {props.message}
      <button type="button" className="btn-close float-left " data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Success;
