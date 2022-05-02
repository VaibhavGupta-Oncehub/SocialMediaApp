import classes from "./LoadingState.module.css";

const LoadingState = (props) => {
  return (
    <div class={classes.main}>
      <div class={classes.loader}></div>
    </div>
  );
};

export default LoadingState;
