import { loginError, loginSuccess } from "./LoginAction";
import { LOGIN_REQUEST } from "./types";
import { put, take, call } from "redux-saga/effects";

// after creating the actions, we have to give them to saga
export default function* loginSaga(loginApi) {
  // where does api comes from ?
  while (true) {
    const loginRequest = yield take(LOGIN_REQUEST); //listens for LOGIN_REQUEST when action loginUser is triggered, this saga takes over
    if (loginRequest.payload) {
      const { username, password } = loginRequest.payload; // take the payload (username and password) from the const in action
      yield call(authorizeUser, loginApi, username, password); // Creates an Effect description that instructs the middleware to call the function fn with args as arguments.
    }
  }
}
function* authorizeUser(loginApi, username, password) {
  // A Generator function, or normal function which either returns a Promise as result, or any other value.
  try {
    const response = yield call(loginApi, username, password);
    const user = {
      id: response.user.id,
      username: response.user.username,
      token: response.jwtToken,
    };
    yield put(loginSuccess(user));
    yield localStorage.setItem("user", JSON.stringify(user));
  } catch (err) {
    yield put(loginError());
  }
}
