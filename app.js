const express =
  require("express");

const cors =
  require("cors");

const swaggerUi =
  require(
    "swagger-ui-express"
  );

const swaggerSpec =
  require(
    "./config/swagger"
  );

const routes =
  require("./routes");

const app = express();

app.use(cors());

app.use(express.json());

// Swagger

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerSpec
  )
);

// All Routes

app.use("/", routes);

module.exports = app;