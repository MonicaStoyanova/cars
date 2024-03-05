import { put, take, call } from "redux-saga/effects";

import { REGISTER_REQUEST } from "./types.js";
import { registerSuccess, registerError } from "./actions.js";
import { loginUser } from "../LoginView/actions"; // check the path

export default function* loginSaga(api) {
  while (true) {
    const registerRequest = yield take(REGISTER_REQUEST);

    if (registerRequest.payload) {
      const { username, password, firstName, lastName } =
        registerRequest.payload;
      yield call(createUser, api, username, password, firstName, lastName);
    }
  }
}

function* createUser(api, username, password, firstName, lastName) {
  let response;
  try {
    response = yield call(
      api.register,
      username,
      password,
      firstName,
      lastName
    );
    const successResponse = response.data;
    yield put(
      registerSuccess(
        successResponse.user,
        successResponse.userId,
        successResponse.firstName,
        successResponse.lastName
      )
    );
    // if the registration is successful, the user will be logged in immediately, it wont be necessary to to login after registration
    if (response) {
      yield put(loginUser(username, password));
    }
  } catch (error) {
    yield put(registerError(error));
  }
}
