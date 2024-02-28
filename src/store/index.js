import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";

//Creates a Redux middleware instance and connects the Sagas to the Redux Store.
const sagaMiddleware = createSagaMiddleware();
// Dummy reducer that just returns the state unchanged.
const dummyReducer = (state = {}) => state;
//A function provided by the @reduxjs/toolkit package that simplifies the process of creating a Redux store with sane defaults and built-in middleware.
export const store = configureStore({
  reducer: { dummy: dummyReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
