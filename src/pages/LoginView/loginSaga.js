import { put, take, call } from "redux-saga/effects";

import { loginError, loginSuccess } from "./LoginAction";
import { LOGIN_REQUEST } from "./types";

// after creating the actions, we have to give them to saga
export default function* loginSaga(loginFetch) {
  while (true) {
    const loginRequest = yield take(LOGIN_REQUEST); //listens for LOGIN_REQUEST when action loginRequest is triggered, this saga takes over
    if (loginRequest.payload) {
      const { username, password } = loginRequest.payload; // take the payload (username and password) from the const in action
      yield call(confirmUser, loginFetch, username, password); // Creates an Effect description that instructs the middleware to call the function fn with args as arguments.
    }
  }
}
function* confirmUser(loginFetch, username, password) {
  // A Generator function, or normal function which either returns a Promise as result, or any other value.
  try {
    const response = yield call(loginFetch, username, password);
    if (!response.user || !response.jwtToken) {
      // Dispatch the loginError action with a custom error message.
      yield put(loginError("Invalid username or password."));
    } else {
      const user = {
        id: response.user.id,
        username: response.user.username,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        password: response.user.password,
        token: response.jwtToken,
      };
      yield put(loginSuccess(user));
      localStorage.setItem("user", JSON.stringify(user));
    }
  } catch (err) {
    yield put(loginError(err.toString()));
  }
}
