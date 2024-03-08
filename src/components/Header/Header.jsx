import React from "react";
import logo from "../../resources/cars.png";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";

const Header = () => {
  const { isLoggedIn, currentUser } = useSelector(
    (state) => state.loginReducer
  );
  return (
    <header>
      <div className={styles.container}>
        <img src={logo} />
        {isLoggedIn ? (
          <>
            <p> Hello, {currentUser}</p>
            <button className={styles.button}>LOGOUT</button>
          </>
        ) : (
          <button className={styles.button}>
            <a href="/login">LOGIN</a>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
