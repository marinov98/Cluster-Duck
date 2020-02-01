import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  const { error } = config();

  if (error) throw error;
}

export default {
  clientId: process.env.REACT_APP_CLIENT_ID
};
