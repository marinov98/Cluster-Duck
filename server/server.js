import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import path from "path";
import { config } from "dotenv";
import { users, posts, auth } from "./routes/index";

/**
 *
 * EXPRESS AND ENVIRONMENT CONFIG INITIALIZATION
 *
 */

config();
const app = express();

/**
 *
 * PORT
 *
 */

const port = parseInt(process.env.PORT, 10) || 3001;
app.set("port", port);

/**
 *
 * MIDDLEWARE
 *
 */

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 *
 * DATABASE CONNECTION
 *
 */

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log(`Database connected to ${process.env.MONGODB_URL}`);
});

/**
 *
 * ROUTES
 *
 */

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/auth", auth);

/**
 *
 * PRODUCTION
 *
 */

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
  });
}

/**
 *
 * LAUNCH SERVER
 *
 */

app.listen(port, () =>
  console.log(`📡 Server up! 📡 Listening on  http://localhost:${port}`)
);

export default app;
