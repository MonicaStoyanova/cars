import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const { isLoggedIn } = useSelector((state) => state.loginReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect to the home page if already logged in
    }
  }, [isLoggedIn]);
};

export default useAuth;
