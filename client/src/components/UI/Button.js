import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link to={props.path} className="">
      <button className={props.className}>
        <span>{props.label}</span>
      </button>
    </Link>
  );
};

export default Button;
