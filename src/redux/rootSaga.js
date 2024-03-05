import { all } from "redux-saga/effects";

import loginSaga from "../pages/LoginView/saga";
import registerSaga from "../pages/RegisterView/saga";

function* rootSaga() {
  yield all([registerSaga(registerApi), loginSaga(loginApi)]);
}
export default rootSaga;
