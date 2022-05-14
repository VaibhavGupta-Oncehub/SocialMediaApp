import classes from "./LoadingState.module.css";

const LoadingState = (props) => {
  return (
    <div className={classes.main}>
      <div className={classes.loader}></div>
    </div>
  );
};

export default LoadingState;
