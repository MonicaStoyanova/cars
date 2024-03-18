import { put, take, call } from "redux-saga/effects";

import { EDIT_CAR_REQUEST } from "./types";
import { editCarError, editCarSuccess } from "./CatalogActions";
import { updateCarFetch } from "../../api/urls";

export default function* editCarsSaga() {
  while (true) {
    const action = yield take(EDIT_CAR_REQUEST);
    const { carDetails } = action.payload;

    try {
      const response = yield call(updateCarFetch, {
        userId: carDetails.user.id,
        carId: carDetails.id,
        updateDetails: carDetails,
      });
      yield put(editCarSuccess(response));
    } catch (error) {
      yield put(editCarError(error.toString()));
    }
  }
}
