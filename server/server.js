import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import path from "path";
import passport from "passport";
import config from "./utils/config/config";
import "./utils/config/passport-jwt";
import { users, posts, auth, replies } from "./routes/index";

/**
 *
 * EXPRESS AND PASSPORT STRATEGY
 *
 */

const app = express();

/**
 *
 * PORT
 *
 */

app.set("port", config.port);

/**
 *
 * DATABASE CONNECTION
 *
 */

mongoose.connect(config.db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log(`Database connected to ${config.db_url}`);
});

/**
 *
 * MIDDLEWARE
 *
 */

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// allow this server to access React while in development
if (process.env.NODE_ENV !== "production") {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", `http://localhost:3000`);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
}

/**
 *
 * ROUTES
 *
 */

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/auth", auth);
app.use("/api/replies", replies);

/**
 *
 * PRODUCTION BUILD
 *
 */

if (process.env.NODE_ENV !== "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
}

/**
 *
 * LAUNCH SERVER
 *
 */

app.listen(config.port, () =>
  console.log(`📡 Server up! 📡 Listening on  http://localhost:${config.port}`)
);

export default app;
