import { Fragment } from "react";
import mealsImage from '../../assets/meals2.jpg'
import classes from './Header.module.css'
import HeaderLoginButton from "./HeaderLoginButton";
import HeaderLogoutButton from "./HeaderLogoutButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header} >
        <h1>SOCIAL</h1>
        <div className={classes.div}>

        <HeaderLoginButton onClick={props.onShowCart}></HeaderLoginButton>
        <HeaderLogoutButton onClick={props.onShowCart}></HeaderLogoutButton>
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="image"></img>
      </div>
    </Fragment>
  );
};

export default Header;
