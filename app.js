require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const activity = require("./APIs/activity");
app.use(activity);

const register = require("./APIs/register");
app.use(register);

// Start the server on port 3000 and listen on all network interfaces (0.0.0.0)
app.listen(3000, "0.0.0.0", () => {
    console.info("App is starting...");
  });