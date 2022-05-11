const Alert = (props) => {
  const informationtype = () => {
    if (props.messageStatus === "error") {
      return (
        <div class="alert alert-danger" role="alert">
          {props.message}
        </div>
      );
    } else {
      return (
        <div class="alert alert-primary" role="alert">
          {props.message}
        </div>
      );
    }
  };
  return <div>{informationtype()}</div>;
};

export default Alert;
