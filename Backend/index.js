const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "learnorigamiinsimplesteps",
    resave: false,
    saveUninitialized: false,
  })
);

const PORT = process.env.PORT || 3000;
mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DBNAME}`;
mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error: ")
);
mongoose.connection.on("connected", () => {
  console.log("successfully connected to MongoDB " + process.env.MONGO_DBNAME);
});
mongoose.connection.on("disconnected", () => {
  console.log("Successfully disconnected");
});

const origamiController = require("./controllers/origami_controller.js");
const signupController = require("./controllers/signup_controller.js");
const loginController = require("./controllers/login_controller.js");

app.use("/origami", origamiController);
app.use("/signup", signupController);
app.use("/login", loginController);

app.get("/", (req, res) => {
  res.redirect("/origami");
});

app.listen(PORT, () => {
  console.log("application running on port: " + PORT);
});
