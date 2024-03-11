import {
  CREATE_CAR_ERROR,
  CREATE_CAR_SUCCESS,
} from "../pages/CatalogView/types";

export const initialState = {
  createCarError: "",
};

function createCarReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CAR_SUCCESS:
      return {
        ...state,
        createCarError: "",
      };

    case CREATE_CAR_ERROR:
      return {
        ...state,
        createCarError: action.payload,
      };

    default:
      return state;
  }
}

export default createCarReducer;
