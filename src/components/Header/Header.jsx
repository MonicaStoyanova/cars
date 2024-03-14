import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../pages/Logout/LogoutAction";

import logo from "../../resources/cars.png";

import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, currentUser } = useSelector(
    (state) => state.loginReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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
