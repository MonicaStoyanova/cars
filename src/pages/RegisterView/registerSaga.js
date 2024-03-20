import { put, take, call } from "redux-saga/effects";

import { REGISTER_REQUEST } from "./types.js";
import { registerSuccess, registerError } from "./actions.js";
import { loginRequest } from "../LoginView/LoginAction";

export default function* registerSaga(registerFetch) {
  // listens for register request
  while (true) {
    const registerRequest = yield take(REGISTER_REQUEST);

    if (registerRequest.payload) {
      const { username, password, firstName, lastName } =
        registerRequest.payload;
      yield call(
        createUser,
        registerFetch,
        username,
        password,
        firstName,
        lastName
      );
    }
  }
}

function* createUser(registerFetch, username, password, firstName, lastName) {
  try {
    const response = yield call(
      registerFetch,
      username,
      password,
      firstName,
      lastName
    );

    const user = {
      id: response.id,
      username: response.username,
      password: response.password,
      firstName: response.firstName,
      token: response.jwtToken,
    };

    yield put(registerSuccess(user));
    // if the registration is successful, the user will be logged in immediately, it wont be necessary to to login after registration
    if (response) {
      yield put(loginRequest(username, password));
    }
  } catch (error) {
    yield put(registerError(error));
  }
}
