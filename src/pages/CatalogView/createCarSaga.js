import { put, take, call } from "redux-saga/effects";

import { createCarError, createCarSuccess } from "./CatalogActions.js";
import { CREATE_CAR_REQUEST } from "./types.js";

export default function* createCarSaga(createCarFetch) {
  while (true) {
    const createCarRequest = yield take(CREATE_CAR_REQUEST);
    if (createCarRequest.payload) {
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
      } = createCarRequest.payload;
      yield call(
        createCar,
        createCarFetch,
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
        year
      );
    }
  }
}

function* createCar(
  createCarFetch,
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
  year
) {
  let response;
  try {
    response = yield call(
      createCarFetch,
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
      year
    );
    yield put(createCarSuccess(response.data));
  } catch (error) {
    yield put(createCarError(error));
  }
}
