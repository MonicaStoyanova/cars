import SignUp from "./RegisterForm";
import styles from "./RegisterView.module.css";

const RegisterScreen = () => {
  return (
    <div className={styles.background}>
      <SignUp />
    </div>
  );
};

export default RegisterScreen;
