const router = require("express").Router();
const preOrderRoutes = require("./preOrderRoutes");

router.use("/preOrders", preOrderRoutes);

module.exports = router;
