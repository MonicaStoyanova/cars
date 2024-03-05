import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./rootReducer";
// import someExampleSaga from './path'
// const store = createStore(rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(); // in the brackets someExampleSaga

export default store;