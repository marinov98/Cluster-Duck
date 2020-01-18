import { config } from "dotenv";

config();

const port = process.env.PORT;
const db_url = process.env.MONGODB_URL;
const jwt_secret = process.env.JWT_SECRET;

const configuration = {
  port,
  db_url,
  jwt_secret
};

export default configuration;
