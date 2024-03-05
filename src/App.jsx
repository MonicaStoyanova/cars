import { Route, Routes } from "react-router-dom";

import LoginScreen from "./pages/LoginView/LoginView";
import RegisterScreen from "./pages/RegisterView/RegisterView";
import CatalogView from "./pages/CatalogView/CatalogView";

import "./App.css";
function App() {
  // auth check
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/catalog" element={<CatalogView />} />
      </Routes>
    </>
  );
}

export default App;
