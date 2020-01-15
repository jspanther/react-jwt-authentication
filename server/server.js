require("rootpath")();
const config = require("config.json");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("helpers/jwt");
const mongoose = require("mongoose");
const errorHandler = require("helpers/error_handler");
const UserRoutes = require("./routes");
const registerRoutes = require("./registerRoutes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



// use JWT auth to secure the api
// app.use(jwt());

app.use("/users",jwt(), UserRoutes);
app.use("/register", registerRoutes);

// global error handler
app.use(errorHandler);
//mongo test

mongoose.connect(config.mongourl, {
  useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

// start server
const port = process.env.NODE_ENV === "production" ? 80 : 4000;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});
