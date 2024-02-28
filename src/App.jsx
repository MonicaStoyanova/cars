import { Route, Routes } from "react-router-dom";

import LoginScreen from "./components/LoginScreen/LoginScreen";

function App() {
  // auth check
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
    </Routes>
  );
}

export default App;
