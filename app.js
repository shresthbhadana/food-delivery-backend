const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/users", routes);
app.use("/", require("./routes/orderRoutes"));
app.use("/", require("./routes/userProfileRoutes"));
app.use("/", require("./routes/dispatcherRoutes"));
app.use("/", require("./routes/restroRoute")); // restro: /admin/restaurants/... & /users/restaurants/...
app.use("/", require("./routes/productRoutes")); // products: /admin/products/... & /users/products/...

module.exports = app;