import { put, take, call } from "redux-saga/effects";
import { DELETE_CAR_REQUEST } from "./types";
import { deleteCarError, deleteCarSuccess } from "./CatalogActions";

export default function* removeCarSaga(deleteCarFetch) {
  while (true) {
    const removeCarRequest = yield take(DELETE_CAR_REQUEST);
    if (removeCarRequest.payload) {
      const { carId, userId, accessToken } = removeCarRequest.payload;
      yield call(removeCar, deleteCarFetch, carId, userId, accessToken);
    }
  }
}

function* removeCar(deleteCarFetch, carId, userId, accessToken) {
  let response;
  try {
    response = yield call(deleteCarFetch, carId, userId, accessToken);
    yield put(deleteCarSuccess(response.data));
  } catch (error) {
    yield put(deleteCarError(error));
  }
}
