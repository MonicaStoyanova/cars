import { REGISTER_ERROR, REGISTER_SUCCESS } from "../pages/RegisterView/types";
// initialState in every reducer for readability
export const initialState = {
  registerError: "",
};

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerError: "",
      };

    case REGISTER_ERROR:
      return {
        ...state,
        registerError: action.payload,
      };

    default:
      return state;
  }
}

export default registerReducer;
