import SignIn from "./LoginForm";
import styles from "./LoginView.module.css";

const LoginScreen = () => {
  return (
    <div className={styles.background}>
      <SignIn />
    </div>
  );
};

export default LoginScreen;
