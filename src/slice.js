import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const usersInitialState = {
  /*example:user: {
    data: null,
    isLoading: false,
    errors: '',
  }*/
};

export const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    /* This action will trigger our saga middleware
       and set the loader to true and reset error message.
    */
    // getUserAction: (state, { payload: id }) => {
    //   state.user.isLoading = true;
    //   state.user.errors = '';
    // },
    // getUserSuccessAction: (state, { payload: user }) => {
    //   state.user.isLoading = false;
    //   state.user.data = user;
    // },
    // getUserErrorAction: (state, { payload: error }) => {
    //   state.user.isLoading = false;
    //   state.user.errors = error;
    // },
  },
});

/* getUserSuccessAction and getUserErrorAction will be used inside the saga
  middleware. Only getUserAction will be used in a React component.
*/

// export {
//   getUserAction,
//   getUserSuccessAction,
//   getUserErrorAction,
// } = usersSlice.actions;

export default usersSlice.reducer;
