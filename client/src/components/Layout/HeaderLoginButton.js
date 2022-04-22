import { useContext, useReducer } from "react";
// import CartContext from "../../store/CartContext"
// import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCardButton.module.css";

const HeaderLoginButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span>Login</span>
    </button>
  );
};

export default HeaderLoginButton;
