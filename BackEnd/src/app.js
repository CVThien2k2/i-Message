const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();
const app = express();

//init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
//init database
require("./dbs/init.mongodb");

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//init routes
const route = require("./routes/index.route");
route(app);
//handling error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

// initsocket
const ServerSocket = require("./socket");
ServerSocket(app);
//passpost
require("./passport");

module.exports = app;
