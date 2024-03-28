import { Navigate, Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

import LoginForm from "./pages/LoginView/LoginForm";
import SignUp from "./pages/RegisterView/RegisterForm";
import CatalogView from "./pages/CatalogView/CatalogView";

import "./App.css";

function App() {
  const { isLoggedIn } = useSelector((state) => state.loginReducer);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginForm /> : <Navigate replace to={"/"} />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <SignUp /> : <Navigate replace to={"/"} />}
        />
        <Route path="/" element={<CatalogView />} />
      </Routes>
    </>
  );
}

export default App;
