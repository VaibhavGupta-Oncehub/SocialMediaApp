import classes from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link to={props.path} className="">
      <button className={classes.button}>
        <span>{props.label}</span>
      </button>
    </Link>
  );
};

export default Button;
