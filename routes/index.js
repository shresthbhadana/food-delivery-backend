const router = require("express").Router();
const preOrderRoutes = require("./preOrderRoutes");
const orderRoutes = require("./orderRoutes");
const userProfileRoutes = require("./userProfileRoutes");
const dispatcherRoutes = require("./dispatcherRoutes");
const notificationRoutes = require("./notificationRoutes");
const globalRoutes = require("./globalRoutes");
const delveryChargeRoutes = require("./deliveryChargeRoutes");
const driverRoutes = require("./driverRoutes")
const scheduleMessageRoutes = require("./scheduleMessageRoutes");

router.use("/users/orders", preOrderRoutes);
router.use("/", orderRoutes);
router.use("/admin", userProfileRoutes);
router.use("/dispatcher", dispatcherRoutes);

router.use("/",driverRoutes);
router.use("/", notificationRoutes);
router.use("/", globalRoutes);
router.use("/",delveryChargeRoutes)
router.use("/", scheduleMessageRoutes);



module.exports = router;