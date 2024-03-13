import { put, take, call } from "redux-saga/effects";
import { DELETE_CAR_REQUEST } from "./types";
import { deleteCarError, deleteCarSuccess } from "./CatalogActions";
import { deleteCarFetch } from "../../api/urls";

export default function* deleteCarSaga() {
  while (true) {
    const { payload } = yield take(DELETE_CAR_REQUEST);
    const { carId, userId } = payload;
    yield call(removeCar, carId, userId);
  }
}

function* removeCar(carId, userId) {
  try {
    const response = yield call(deleteCarFetch, carId, userId);
    yield put(deleteCarSuccess(response.data));
  } catch (error) {
    yield put(deleteCarError(error.toString()));
  }
}
