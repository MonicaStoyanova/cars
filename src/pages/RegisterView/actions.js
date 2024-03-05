import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from "./types";
// if all fields are filled registerUser is called, which will trigger saga REGISTER_REQUEST
export function registerUser(username, password, firstName, lastName) {
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

export function registerSuccess(username, userId, firstName, lastName) {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      username,
      userId,
      firstName,
      lastName,
    },
  };
}

export function registerError(errorMessage) {
  return {
    type: REGISTER_ERROR,
    payload: errorMessage,
  };
}
