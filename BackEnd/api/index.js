const app = require("../src/app");
const port = process.env.PORT || 3002;

const server = app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server is close.");
  });
});
