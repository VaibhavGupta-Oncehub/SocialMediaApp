import { useContext, useReducer } from "react";
// import CartContext from "../../store/CartContext"
// import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCardButton.module.css";

const HeaderLogoutButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span>Logout</span>
    </button>
  );
};

export default HeaderLogoutButton;
