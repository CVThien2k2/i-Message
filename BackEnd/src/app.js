const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const cors = require("cors");
require("dotenv").config();
const app = express();
// const YAML = require("yamljs");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = YAML.load("./src/swagger.yaml");
// Cấu hình Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "My App API",
      version: "1.0.0",
      description: "API documentation for my Express app",
    },
    servers: [
      {
        url: "http://localhost:8081",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Đường dẫn tới các file route để Swagger quét và tạo tài liệu
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
//init database
require("./database/init.mongodb");

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
// const ServerSocket = require("./socket");
// ServerSocket(app);
//passpost
require("./passport");

module.exports = app;
