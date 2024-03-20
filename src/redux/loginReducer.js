import { LOGIN_ERROR, LOGIN_SUCCESS } from "../pages/LoginView/types";
import { LOGOUT } from "../pages/Logout/types";
// initialState in every reducer for readability
export const initialUserState = {
  isLoggedIn: false,
  loginError: "",
  currentUser: false, //this is the username
  password: null,
  firstName: "",
  lastName: "",
  userId: "",
  accessToken: null,
};

function loginReducer(state = initialUserState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        loginError: "",
        currentUser: action.payload.username,
        password: action.payload.password,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userId: action.payload.id,
        accessToken: action.payload.token,
      };

    case LOGIN_ERROR:
      return {
        loginError: action.payload,
        currentUser: false,
        isLoggedIn: false,
        userId: null,
        accessToken: null,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      return {
        ...initialUserState,
      };
    default:
      return state;
  }
}
export default loginReducer;
