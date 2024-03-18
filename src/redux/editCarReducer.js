import { EDIT_CAR_SUCCESS, EDIT_CAR_ERROR } from "../pages/CatalogView/types";

export const initialState = {
  editCarError: "",
};

function editCarReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_CAR_SUCCESS:
      return {
        ...state,
        editCarError: "",
      };

    case EDIT_CAR_ERROR:
      return {
        ...state,
        editCarError: action.payload,
      };

    default:
      return state;
  }
}

export default editCarReducer;
