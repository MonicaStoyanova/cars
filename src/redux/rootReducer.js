import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import registerReducer from "./registerReducer";
import getCarsReducer from "./getCarsReducer";
import editCarReducer from "./editCarReducer";
import createCarReducer from "./createCarReducer";
import deleteCarReducer from "./deleteCarReducer";

export default combineReducers({
  loginReducer: loginReducer,
  registerReducer: registerReducer,
  getCarsReducer: getCarsReducer,
  createCarReducer: createCarReducer,
  editCarReducer: editCarReducer,
  deleteCarReducer: deleteCarReducer,
});
