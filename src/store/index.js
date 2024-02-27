import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./root-reducer";

//Creates a Redux middleware instance and connects the Sagas to the Redux Store.
const sagaMiddleware = createSagaMiddleware();
//A function provided by the @reduxjs/toolkit package that simplifies the process of creating a Redux store with sane defaults and built-in middleware.
const store = configureStore({
  reducer: { rootReducers },
  middleware: [sagaMiddleware],
});

export default store;
