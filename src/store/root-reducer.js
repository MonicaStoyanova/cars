import userReducer from "./users/slice";
import usersReducer from "./users/slice";
const rootReducers = {
  // Reducers here
  //takes all our application reducers combined in a single reducer, is considered as best practice to keep things clean and clear.
  users: usersReducer,
};

export default rootReducers;
//we don’t want our store/index.js to get bigger as we add more reducers. So… we’re creating a separate file named root-reducer.js:
