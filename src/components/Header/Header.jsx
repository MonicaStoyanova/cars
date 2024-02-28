import React from "react";
import logo from "../../resources/cars.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <img src={logo} />
        {/* if user is not logged in */}
        <button className={styles.button}>LOGIN</button>
        {/* else, Hello {username} */}
      </div>
    </header>
  );
};

export default Header;
