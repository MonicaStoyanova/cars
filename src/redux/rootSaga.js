import { all } from "redux-saga/effects";

import loginSaga from "../pages/LoginView/loginSaga";
import registerSaga from "../pages/RegisterView/registerSaga";
import { loginFetch, registerFetch } from "../api/urls";

function* rootSaga() {
  yield all([registerSaga(registerFetch), loginSaga(loginFetch)]);
}
export default rootSaga;
