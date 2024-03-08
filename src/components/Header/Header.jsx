import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../pages/Logout/LogoutAction";

import logo from "../../resources/cars.png";

import styles from "./Header.module.css";

const Header = () => {
  const { isLoggedIn, currentUser } = useSelector(
    (state) => state.loginReducer
  );

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className={styles.container}>
        <img src={logo} />
        {isLoggedIn ? (
          <>
            <p> Hello, {currentUser}</p>
            <button className={styles.button} onClick={handleLogout}>
              LOGOUT
            </button>
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
