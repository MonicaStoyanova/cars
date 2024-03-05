import LoginForm from "./LoginForm";
import styles from "./LoginView.module.css";

const LoginScreen = () => {
  return (
    <div className={styles.background}>
      <LoginForm />
    </div>
  );
};

export default LoginScreen;
