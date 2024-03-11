import { put, take, call } from "redux-saga/effects";

import { REGISTER_REQUEST } from "./types.js";
import { registerSuccess, registerError } from "./actions.js";
import { loginRequest } from "../LoginView/LoginAction";

export default function* registerSaga(registerFetch) {
  // listens for reg request
  while (true) {
    console.log("in register saga while true");
    const registerRequest = yield take(REGISTER_REQUEST);

    if (registerRequest.payload) {
      const { username, password, firstName, lastName } =
        registerRequest.payload;
      console.log(
        "do we have the data in here ? " + username,
        password,
        firstName,
        lastName
      );
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
  console.log(
    "in create user with params " + username,
    password,
    firstName,
    lastName
  );
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
    console.log("the userdata that we receive is " + "id " + user.id);
    console.log(
      "the userdata that we receive is " + "username " + user.username
    );
    console.log(
      "the userdata that we receive is " + "firstName " + user.firstName
    );
    console.log("the userdata that we receive is " + "id " + user.token);

    yield put(registerSuccess(user));
    // if the registration is successful, the user will be logged in immediately, it wont be necessary to to login after registration
    if (response) {
      console.log(
        response +
          " if its true we will go to login request with " +
          username +
          " " +
          password
      );
      console.log("after register log in automatically");
      yield put(loginRequest(username, password));
    }
  } catch (error) {
    console.log("in the register error " + error.message);
    yield put(registerError(error));
  }
}
