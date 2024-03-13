import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from "./types";
export const loginRequest = (username, password) => {
  return { type: LOGIN_REQUEST, payload: { username, password } };
  // this constant will have the name, and credentials that we will give to Saga
  // the type is what triggers the saga because it is listening for it
};

// if the login is successful, we will need to keep some data in the store
export const loginSuccess = ({
  id,
  username,
  firstName,
  lastName,
  password,
  token,
}) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { id, username, firstName, lastName, password, token },
  };
};

// if the login is unsuccessful, show error message
export const loginError = (err) => {
  return {
    type: LOGIN_ERROR,
    payload: err,
  };
};
