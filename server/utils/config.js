import { config } from "dotenv";

config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URL;
const JWT_SECRET = process.env.JWT_SECRET;

export { PORT, MONGODB_URI, JWT_SECRET };
