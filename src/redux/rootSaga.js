import { all } from "redux-saga/effects";

import loginSaga from "../pages/LoginView/loginSaga";
import registerSaga from "../pages/RegisterView/registerSaga";
import {
  createCarFetch,
  deleteCarFetch,
  fetchAllCars,
  loginFetch,
  registerFetch,
  updateCarFetch,
} from "../api/urls";
import getAllCarsSaga from "../pages/CatalogView/getAllCarsSaga";
import createCarSaga from "../pages/CatalogView/createCarSaga";
import deleteCarSaga from "../pages/CatalogView/deleteCarSaga";
import editCarsSaga from "../pages/CatalogView/editCarSaga";

function* rootSaga() {
  yield all([
    registerSaga(registerFetch),
    loginSaga(loginFetch),
    getAllCarsSaga(fetchAllCars),
    createCarSaga(createCarFetch),
    deleteCarSaga(deleteCarFetch),
    editCarsSaga(updateCarFetch),
  ]);
}
export default rootSaga;
