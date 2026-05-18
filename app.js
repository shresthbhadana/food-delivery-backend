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
app.use("/", require("./routes/restroRoute")); 
app.use("/", require("./routes/productRoutes")); 
app.use("/", require("./routes/driverRoutes")); 
app.use("/", require("./routes/promoCodeRoutes"));
app.use("/", require("./routes/globalRoutes"));
app.use("/", require("./routes/deliveryChargeRoutes"));
module.exports = app;