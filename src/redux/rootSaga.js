import { all } from "redux-saga/effects";

import loginSaga from "../pages/LoginView/loginSaga";
import registerSaga from "../pages/RegisterView/registerSaga";
import { fetchAllCars, loginFetch, registerFetch } from "../api/urls";
import getAllCarsSaga from "../pages/CatalogView/getAllCarsSaga";

function* rootSaga() {
  yield all([
    registerSaga(registerFetch),
    loginSaga(loginFetch),
    getAllCarsSaga(fetchAllCars),
  ]);
}
export default rootSaga;
