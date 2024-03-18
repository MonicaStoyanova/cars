import { put, takeEvery, call } from "redux-saga/effects";

import { getAllCarsSuccess, getAllCarsError } from "./CatalogActions"; // Correct import paths
import { GET_ALL_CARS_REQUEST } from "./types";
import { fetchAllCars } from "../../api/urls";

function* fetchAllCarsSaga() {
  try {
    const response = yield call(fetchAllCars);
    yield put(getAllCarsSuccess(response)); //
  } catch (error) {
    yield put(getAllCarsError(error.toString()));
  }
}

export default function* getAllCarsWatcherSaga() {
  yield takeEvery(GET_ALL_CARS_REQUEST, fetchAllCarsSaga);
}
