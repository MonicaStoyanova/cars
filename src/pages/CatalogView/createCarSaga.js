import { put, take, call } from "redux-saga/effects";

import { createCarError, createCarSuccess } from "./CatalogActions.js";
import { CREATE_CAR_REQUEST } from "./types.js";
import { createCarFetch } from "../../api/urls.js";

export default function* createCarSaga() {
  while (true) {
    const { payload } = yield take(CREATE_CAR_REQUEST);
    yield call(createCar, payload);
  }
}

function* createCar(carDetails) {
  try {
    const response = yield call(createCarFetch, carDetails); // Call fetch function with the carDetails object
    yield put(createCarSuccess(response));
  } catch (error) {
    yield put(createCarError(error.toString()));
  }
}
