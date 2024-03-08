export const BASE_URL = "";
export const LOGIN_URL = `${BASE_URL}/users/login`;
export const REGISTER_URL = `${BASE_URL}/users/register`;
export const LOGOUTS_PATH = "";
export const ALL_CARS = `${BASE_URL}+something`;

const mockResponse = {
  user: {
    id: "user123",
    username: "johndoe",
    firstName: "John",
  },
  jwtToken: "fakeToken123",
};
window.fetch = () =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockResponse),
  });

// fetch to those urls and return results
export const loginFetch = async (username, password) => {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return await response.json();
};

// real
// export const registerFetch = async (
//   username,
//   password,
//   firstName,
//   lastName
// ) => {
//   const response = await fetch(REGISTER_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password, firstName, lastName }),
//   });
//   if (!response.ok) {
//     throw new Error("Registration failed");
//   }
//   return await response.json();
// };

// Mock response for a successful registration
const mockResponse2 = {
  id: "someUniqueId",
  username: "userExample",
  password: "userPassword",
  firstName: "John",
  lastName: "Doe",
  jwtToken: "token",
};

// Mock function to simulate fetch
export const registerFetch = async (
  username,
  password,
  firstName,
  lastName
) => {
  // Simulate a delay to mimic network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check if inputs match expected values for success (for demonstration)
  if (
    username !== "" &&
    password !== "" &&
    firstName !== "" &&
    lastName !== ""
  ) {
    return mockResponse2;
  } else {
    throw new Error("Registration failed"); // Simulate failure if inputs are not as expected
  }
};
