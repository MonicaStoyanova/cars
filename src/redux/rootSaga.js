import { all } from "redux-saga/effects";

import loginSaga from "../pages/LoginView/loginSaga";
import registerSaga from "../pages/RegisterView/registerSaga";
import {
  createCarFetch,
  fetchAllCars,
  loginFetch,
  registerFetch,
} from "../api/urls";
import getAllCarsSaga from "../pages/CatalogView/getAllCarsSaga";
import createCarSaga from "../pages/CatalogView/createCarSaga";

function* rootSaga() {
  yield all([
    registerSaga(registerFetch),
    loginSaga(loginFetch),
    getAllCarsSaga(fetchAllCars),
    createCarSaga(createCarFetch),
  ]);
}
export default rootSaga;
