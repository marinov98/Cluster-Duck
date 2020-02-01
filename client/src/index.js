import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { config } from "dotenv";

if (process.env.REACT_APP_STAGE !== "production") {
  const { error } = config();

  if (error) throw error;
}

export default {
  clientId: process.env.REACT_APP_CLIENT_ID
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
