import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from "./types";
// if all fields are filled registerUser is called, which will trigger saga REGISTER_REQUEST
export function registerUser(firstName, lastName, username, password) {
  console.log(
    "register user action is called with those params : " + firstName,
    lastName,
    username,
    password
  );
  return {
    type: REGISTER_REQUEST,
    payload: {
      username,
      password,
      firstName,
      lastName,
    },
  };
}

export function registerSuccess(
  username,
  password,
  userId,
  firstName,
  lastName,
  jwtToken
) {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      username,
      password,
      userId,
      firstName,
      lastName,
      jwtToken,
    },
  };
}

export function registerError(errorMessage) {
  return {
    type: REGISTER_ERROR,
    payload: errorMessage,
  };
}
