/*
functions that get data from the app
send data to reducer after process
must have type key in return
payload
*/

// trying to log in user with the credentials they entered
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from "./types";
export const loginUser = (username, password) => {
  return { type: LOGIN_REQUEST, payload: { username, password } };
  // this constant will have the name, and credentials that we will give to Saga
  // the type is what triggers the saga because it is listening for it
};

// if the login is successful, we will need to keep some data in the store
export const loginSuccess = (username) => {
  // we might need more params
  return {
    type: LOGIN_SUCCESS,
    payload: username,
  };
};

// if the login is unsuccessful, we will need to show an error message
export const loginError = () => {
  return {
    type: LOGIN_ERROR,
    payload: "Username or password is incorrect",
  };
};
