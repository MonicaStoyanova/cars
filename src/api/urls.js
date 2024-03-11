export const BASE_URL = "http://localhost:8080";
export const LOGIN_URL = `${BASE_URL}/users/login`;
export const REGISTER_URL = `${BASE_URL}/users/register`;
export const ALL_CARS = `${BASE_URL}/cars/all`;

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

export const registerFetch = async (
  username,
  password,
  firstName,
  lastName
) => {
  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, firstName, lastName }),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  const textResponse = await response.text(); // the server returns plain text not json
  if (textResponse === "Success") {
    return {
      status: "success",
      message: "Registration successful",
    };
  } else {
    throw new Error(`Unexpected response: ${textResponse}`);
  }
};
