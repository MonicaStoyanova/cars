import React from "react";
import logo from "../../resources/cars.png";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";

const Header = () => {
  const userLoggedInfo = useSelector((state) => state.currentUser);
  return (
    <header>
      <div className={styles.container}>
        <img src={logo} />
        {userLoggedInfo ? (
          <>
            <p> Hello, {userLoggedInfo}</p>
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
