import axios from "axios";
import jwt_decode from "jwt-decode";

/**
 * @desc takes in token, if its valid, apply token to every request
 * @param {*} token
 * @return none
 */
export function setToken(token) {
  // set all requests to have the jwt in the Authorization header if the jwt is valid
  if (token) axios.defaults.headers.common["Authorization"] = token;
  else delete axios.defaults.headers.common["Authorization"]; // remove token from all requests if invalid
}

/**
 * @desc Register user and redirect to login
 * @return None
 * @param {*} user
 * @param {*} history
 */
export async function registerUser(user, history) {
  try {
    const { status } = await axios.post("http://localhost:3999/api/auth/register", user);
    // if the status is 201, it means user was successfully registered
    if (status === 201) history.push("/login"); // redirect to login upon successful registration
  } catch (err) {
    if (err.response) {
      return err.response.data;
    } else console.error(err);
  }
}

/**
 * @desc Login the user
 * @return User object
 * @param {*} user
 */
export async function loginUser(user) {
  try {
    const { data } = await axios.post("http://localhost:3999/api/auth/login", user);

    // set in Local storage, then in headers
    localStorage.setItem("accessToken", data.token);

    setToken(data.token);

    // decode to get user data
    const userInfo = jwt_decode(data.token);
    return { authenticated: true, user: userInfo };
  } catch (err) {
    if (err.response) {
      return err.response.data;
    } else console.error(err);
  }
}

/**
 * @desc Login the user with google
 * @return User object
 * @param {*} user
 */
export async function loginUserGoogle(user) {
  try {
    let webApiUrl = `http://localhost:3999/api/auth/googlelogin`;
    const { data } = await axios.post(webApiUrl, user);

    // set in Local storage
    localStorage.setItem("accessToken", data.token);

    setToken(data.token);

    return { authenticated: true, user: user };
  } catch (err) {
    if (err.response) {
      return err.response.data;
    } else console.error(err);
  }
}

/**
 * @desc Logout the user
 * @return Empty object to nullify user
 */
export function logoutUser() {
  // ensure local storage is supported
  if (typeof Storage === "undefined")
    throw new Error("Browser does not support local storage!");

  // remove item token from local storage
  localStorage.removeItem("accessToken");

  // remove from headers
  setToken(false);
}

/**
 * @desc Authenticate user on Login
 * @return boolean
 */
export function authenticate() {
  if (typeof Storage === "undefined")
    throw new Error("Browser does not support local storage!");

  let res = { authenticated: false };

  if (localStorage["accessToken"]) {
    const token = localStorage["accessToken"];

    // set token in headers
    setToken(token);

    const userInfo = jwt_decode(token);

    const currentTime = Date.now() / 1000; // curr time in miliseconds

    // check if token has not expired
    if (userInfo.exp < currentTime) logoutUser();
    else {
      res.user = userInfo;
      res.authenticated = true;
    }
  }

  return res;
}
