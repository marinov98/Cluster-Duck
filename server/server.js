import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import path from "path";
import { config } from "dotenv";

// dotenv config made for later
config();

// intialize express and ports
const app = express();

const port = parseInt(process.env.PORT, 10) || 5000;

app.set("port", port);

// middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to database (UNCOMMENT WHEN URL IS KNOWN)
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log(`Database connected to ${process.env.MONGODB_URL}`)
});

// Connect front and back-end when in PRODUCTION
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
  });
}

app.listen(port, () =>
  console.log(`📡 Server up! 📡 Listening on  http://localhost:${port}`)
);

export default app;
