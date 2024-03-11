import {
  DELETE_CAR_SUCCESS,
  DELETE_CAR_ERROR,
} from "../pages/CatalogView/types";

export const initialState = {
  removeCarsError: "",
};

function deleteCarReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_CAR_SUCCESS:
      return {
        ...state,
        removeCarsError: "",
      };

    case DELETE_CAR_ERROR:
      return {
        ...state,
        removeCarsError: action.payload,
      };

    default:
      return state;
  }
}

export default deleteCarReducer;
