import { Route, Routes } from "react-router-dom";

import LoginForm from "./pages/LoginView/LoginForm";
import SignUp from "./pages/RegisterView/RegisterForm";
import CatalogView from "./pages/CatalogView/CatalogView";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<CatalogView />} />
      </Routes>
    </>
  );
}

export default App;
