import { LOGIN_ERROR, LOGIN_SUCCESS } from "../pages/LoginView/types";

const initialUserState = {
  loginError: "",
  currentUser: false,
  isLoggedIn: false,
  userId: null,
  accessToken: null,
};
export const loginReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        currentUser: action.payload.username,
        userId: action.payload.userId,
        accessToken: action.payload.accessToken,
        isLoggedIn: true,
        loginError: "",
      };

    case LOGIN_ERROR:
      return {
        loginError: action.payload,
        currentUser: false,
        isLoggedIn: false,
        userId: null,
        accessToken: null,
      };
    default:
      return state;
  }
};
