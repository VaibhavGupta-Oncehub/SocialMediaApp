const Success = (props) => {
  return (
    <div class="alert alert-success" role="alert">
      {props.message}
      <button type="button" class="btn-close float-left " data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Success;
