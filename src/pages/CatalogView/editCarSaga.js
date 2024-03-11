import { put, take, call } from "redux-saga/effects";
import { EDIT_CAR_REQUEST } from "./types";
import { editCarError, editCarSuccess } from "./CatalogActions";

export default function* getCarsSaga(updateCarFetch) {
  while (true) {
    const editCarRequest = yield take(EDIT_CAR_REQUEST);
    if (editCarRequest.payload) {
      const {
        accessToken,
        city,
        color,
        condition,
        engineType,
        extras,
        gearBox,
        horsePower,
        id,
        make,
        mileage,
        model,
        price,
        user,
        year,
        userId,
      } = editCarRequest.payload;

      yield call(
        editCar,
        updateCarFetch,
        accessToken,
        city,
        color,
        condition,
        engineType,
        extras,
        gearBox,
        horsePower,
        id,
        make,
        mileage,
        model,
        price,
        user,
        year,
        userId
      );
    }
  }
}

function* editCar(
  updateCarFetch,
  accessToken,
  city,
  color,
  condition,
  engineType,
  extras,
  gearBox,
  horsePower,
  id,
  make,
  mileage,
  model,
  price,
  user,
  year,
  userId
) {
  let response;

  try {
    response = yield call(
      updateCarFetch,
      accessToken,
      city,
      color,
      condition,
      engineType,
      extras,
      gearBox,
      horsePower,
      id,
      make,
      mileage,
      model,
      price,
      user,
      year,
      userId
    );
    yield put(editCarSuccess(response.data));
  } catch (error) {
    yield put(editCarError(error));
  }
}
