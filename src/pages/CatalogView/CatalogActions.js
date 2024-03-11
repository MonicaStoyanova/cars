import {
  GET_ALL_CARS_REQUEST,
  GET_ALL_CARS_SUCCESS,
  GET_ALL_CARS_ERROR,
  CREATE_CAR_REQUEST,
  CREATE_CAR_SUCCESS,
  CREATE_CAR_ERROR,
  EDIT_CAR_REQUEST,
  EDIT_CAR_SUCCESS,
  EDIT_CAR_ERROR,
  DELETE_CAR_REQUEST,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_ERROR,
} from "./types";
// getting all cars
export function getAllCars() {
  return {
    type: GET_ALL_CARS_REQUEST,
  };
}

export function getAllCarsSuccess(cars) {
  return {
    type: GET_ALL_CARS_SUCCESS,
    payload: {
      cars,
    },
  };
}
export function getAllCarsError(errorMessage) {
  return {
    type: GET_ALL_CARS_ERROR,
    payload: errorMessage,
  };
}

// create car
export function createCar(
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
  return {
    type: CREATE_CAR_REQUEST,
    payload: {
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
    },
  };
}

export function createCarSuccess(createCar) {
  return {
    type: CREATE_CAR_SUCCESS,
    payload: {
      createCar,
    },
  };
}

export function createCarError(errorMessage) {
  return {
    type: CREATE_CAR_ERROR,
    payload: errorMessage,
  };
}

// edit car
export function editCar(
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
  return {
    type: EDIT_CAR_REQUEST,
    payload: {
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
    },
  };
}

export function editCarSuccess(updatedCar) {
  return {
    type: EDIT_CAR_SUCCESS,
    payload: {
      updatedCar,
    },
  };
}

export function editCarError(errorMessage) {
  return {
    type: EDIT_CAR_ERROR,
    payload: errorMessage,
  };
}

// delete car
export function deleteCar(carId, userId, accessToken) {
  return {
    type: DELETE_CAR_REQUEST,
    payload: {
      carId,
      userId,
      accessToken,
    },
  };
}

export function deleteCarSuccess(statusMessage) {
  return {
    type: DELETE_CAR_SUCCESS,
    payload: {
      statusMessage,
    },
  };
}

export function deleteCarError(errorMessage) {
  return {
    type: DELETE_CAR_ERROR,
    payload: errorMessage,
  };
}
