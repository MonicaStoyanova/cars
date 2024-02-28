import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import { store } from "./store";
import Home from "./components/Home/Home";
import "./App.css";
function App() {
  // auth check
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
