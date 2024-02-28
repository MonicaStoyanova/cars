import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import LoginScreen from "./pages/LoginView/LoginView";
import { store } from "./store";

import "./App.css";

import RegisterScreen from "./pages/RegisterView/RegisterView";

import CatalogView from "./pages/CatalogView/CatalogView";
function App() {
  // auth checks
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/catalog" element={<CatalogView />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
