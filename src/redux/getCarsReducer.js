import {
  GET_ALL_CARS_SUCCESS,
  GET_ALL_CARS_ERROR,
} from "../pages/CatalogView/types";

export const initialState = {
  getCarsError: "",
  cars: [],
};

function getCarsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARS_SUCCESS:
      console.log(" in the reducer");
      return {
        ...state,
        cars: action.payload.cars,
        getCarsError: "",
      };

    case GET_ALL_CARS_ERROR:
      return {
        ...state,
        getCarsError: action.payload,
      };

    default:
      return state;
  }
}

export default getCarsReducer;
