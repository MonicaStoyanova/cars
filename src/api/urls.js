export const BASE_URL = "http://localhost:8080";
export const LOGIN_URL = `${BASE_URL}/users/login`;
export const REGISTER_URL = `${BASE_URL}/users/register`;
export const ALL_CARS = `${BASE_URL}/cars/all`;
export const CREATE_CAR = `${BASE_URL}/cars/create`;
export const UPDATE_CAR = `${BASE_URL}/cars/{userId}`; // EDIT
export const DELETE_CAR = `${BASE_URL}/cars/{id}/{userId}`;

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

export const fetchAllCars = async () => {
  const response = await fetch(ALL_CARS);
  if (!response.ok) {
    throw new Error("Could not fetch car data");
  }
  return await response.json();
};

export const createCarFetch = async (carDetails) => {
  const response = await fetch(CREATE_CAR, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carDetails),
  });
  if (!response.ok) {
    throw new Error("Failed to create car");
  }
  return await response.json();
};

export const updateCarFetch = async (carDetails) => {
  const { userId, carId, updateDetails } = carDetails;
  const updateCarUrl = UPDATE_CAR.replace("{userId}", userId).replace(
    "{id}",
    carId
  );
  const response = await fetch(updateCarUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateDetails),
  });
  if (!response.ok) {
    throw new Error("Failed to update car");
  }
  return await response.json();
};

export const deleteCarFetch = async (carId, userId) => {
  const deleteCarUrl = DELETE_CAR.replace("{id}", carId).replace(
    "{userId}",
    userId
  );
  const response = await fetch(deleteCarUrl, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete car");
  }
  return await response.text(); // Assuming the server returns a plain text response on successful deletion
};
