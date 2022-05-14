const Alert = (props) => {
  const informationtype = () => {
    if (props.messageStatus === "error") {
      return (
        <div className="alert alert-danger" role="alert">
          {props.message}
        </div>
      );
    } else {
      return (
        <div className="alert alert-primary" role="alert">
          {props.message}
        </div>
      );
    }
  };
  return <div>{informationtype()}</div>;
};

export default Alert;
