/*
functions that get data from the app
send data to reducer after process
must have type key in return
payload
*/
export const loginUser = () => {
  return { type: "LOGIN_USER", payload: "somedata" };
};
