import axios from "axios";
import jwt_decode from "jwt-decode";

/**
 * @desc takes in token, if its valid, apply token to every request
 * @param {*} token
 * @return none
 */
function setAuthHeader(token) {
  // set all requests to have the jwt in the Authorization header if the jwt is valid
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"]; // remove token from all requests if invalid
}

/**
 * @desc take in boolean variable and applies admin header to every request
 * @param {*} isAdmin
 * @return none
 */
function setAdminHeader(isAdmin) {
  if (isAdmin) axios.defaults.headers.common["Admin"] = true;
  else delete axios.defaults.headers.common["Admin"];
}

/**
 * @desc Register user and redirect to login
 * @return None
 * @param {*} user
 * @param {*} history
 */
export async function registerUser(user, history) {
  try {
    const { status } = await axios.post(
      "http://localhost:4004/api/auth/register",
      user
    );
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
    const {
      data: { token }
    } = await axios.post("http://localhost:4004/api/auth/login", user);

    // set in Local storage, then in headers
    localStorage.setItem("accessToken", token);

    // set requests to use token in the Authorization header
    setAuthHeader(token);

    // decode to get user data
    const userInfo = jwt_decode(token);

    if (userInfo.isAdmin) setAdminHeader(true);

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
    const {
      data: { token }
    } = await axios.post(`http://localhost:4004/api/auth/googlelogin`, user);

    // set in Local storage
    localStorage.setItem("accessToken", token);

    // set authorization headers to use the token in requests
    setAuthHeader(token);

    // get the user information from the token
    const userInfo = jwt_decode(token);

    return { authenticated: true, user: userInfo };
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
  if (localStorage["accessToken"]) {
    const token = localStorage.getItem("accessToken");

    const { email } = jwt_decode(token);

    // remove item token from local storage
    localStorage.removeItem("accessToken");

    // remove from headers
    setAuthHeader(false);
    setAdminHeader(false);

    // remove any refresh tokens
    axios.put("http://localhost:4004/api/auth/token/reject", { email });
  }
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
    const token = localStorage.getItem("accessToken");
    // set token in headers
    setAuthHeader(token);

    const userInfo = jwt_decode(token);

    const currentTime = Date.now() / 1000; // curr time in miliseconds
    // check if token has expired
    if (userInfo.exp < currentTime) logoutUser();
    else {
      res.user = userInfo;
      res.authenticated = true;
    }
  }

  return res;
}
