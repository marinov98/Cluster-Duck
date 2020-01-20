import axios from "axios";
import jwt_decode from "jwt-decode";

/**
 * @desc takes in token, if its valid, apply token to every request
 * @param {*} token
 * @return none
 */
export function setToken(token) {
  if (token) axios.defaults.headers.common["Authorization"] = token;
  else delete axios.defaults.headers.common["Authorization"];
}

/**
 * @desc Register user and redirect to login
 * @return None
 * @param {*} user
 * @param {*} history
 */
export async function registerUser(user, history) {
  try {
    const { status } = await axios.post("/api/auth/register", user);
    // if the status is 201, it means user was successfully registered
    if (status === 201) history.push("/login"); // redirect to login
  } catch (err) {
    console.error(err);
  }
}

/**
 * @desc Login the user
 * @return User object
 * @param {*} user
 */
export async function loginUser(user) {
  try {
    const { data } = await axios.post("/api/auth/login", user);

    // set in Local storage, then in headers
    localStorage.setItem("jwtToken", token);

    setToken(data.token);

    // decode to get user data
    const userInfo = jwt_decode(data.token);

    return userInfo;
  } catch (err) {
    console.error(err);
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
  localStorage.removeItem("jwtToken");

  // remove from headers
  setToken(false);

  return {};
}

/**
 * @desc Authenticate user on Login
 * @return boolean
 */
export function authenticate() {
  if (typeof Storage === "undefined")
    throw new Error("Browser does not support local storage!");

  let res = { authenticated: false };

  if (localStorage["jwtToken"]) {
    const token = localStorage["jwtToken"];

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
