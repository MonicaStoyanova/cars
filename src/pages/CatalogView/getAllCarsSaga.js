import { put, take, call } from "redux-saga/effects";
import { getCarsSuccess, getCarsError } from "./actions.js";
import { GET_ALL_CARS_REQUEST } from "./types";

export default function* getAllCarsSaga(fetchAllCars) {
  while (true) {
    const getAllCarsRequest = yield take(GET_ALL_CARS_REQUEST);
    yield call(getAllCars, fetchAllCars);
  }
}

function* getAllCars(fetchAllCars) {
  let response;
  try {
    response = yield call(fetchAllCars.getCars);
    yield put(getCarsSuccess(response.data));
  } catch (error) {
    yield put(getCarsError(error));
  }
}
