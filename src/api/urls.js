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

/*export const registerFetch */
