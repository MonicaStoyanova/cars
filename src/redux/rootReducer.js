import { combineReducers } from "redux";
import { loginReducer } from "./LoginReducer";
import { registerReducer } from "./registerReducer";
export default combineReducers({
  loginReducer,
  registerReducer,
});
