import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") config();

export default {
  clientId: process.env.REACT_APP_CLIENT_ID
};
