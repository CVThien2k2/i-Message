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
    openapi: "3.0.3",
    info: {
      title: "Tài liệu API cho ứng dụng MXH",
      version: "1.0.11",
      description:
        "API này cung cấp một bộ điểm cuối toàn diện để quản lý ứng dụng trên mạng xã hội. Nó cho phép các nhà phát triển tương tác với danh mục. API cũng hỗ trợ các tính năng như lọc, sắp xếp và phân trang để giúp quản lý dữ liệu hiệu quả.",
    },
    servers: [
      {
        url: "http://localhost:8081/api/v1"
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "66c9c19dde0a450a7d15742b" },
            email: { type: "string", example: "caovanthien9102002@gmail.com" },
            given_name: { type: "string", example: "Thiện" },
            family_name: { type: "string", example: "Cao Văn" },
            number_phone: { type: "string", example: "0123456789" },
            gender: { type: "string", example: "male" },
            address: { type: "string", example: "123 Đường ABC, Quận XYZ" },
            avatar: { type: "string", example: "https://example.com/avatar.jpg" },
            doB: { type: "string", example: "1990-01-01" }
          }
        },
        Tokens: {
          type: "object",
          properties: {
            accessToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
          }
        }
      }
    }
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
