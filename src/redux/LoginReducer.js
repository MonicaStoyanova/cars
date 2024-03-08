import { LOGIN_ERROR, LOGIN_SUCCESS } from "../pages/LoginView/types";
// initialState in every reducer for readability
const initialUserState = {
  isLoggedIn: false,
  loginError: "",
  currentUser: false, //this is the username
  userId: null,
  accessToken: null,
};

export const loginReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        loginError: "",
        currentUser: action.payload.username,
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
    default:
      return state;
  }
};
