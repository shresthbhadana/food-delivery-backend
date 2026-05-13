const router = require("express").Router();
const preOrderRoutes = require("./preOrderRoutes");
const orderRoutes = require("./orderRoutes");
const userProfileRoutes = require("./userProfileRoutes");
const dispatcherRoutes = require("./dispatcherRoutes");

const driverRoutes = require("./driverRoutes")

router.use("/users/orders", preOrderRoutes);
router.use("/", orderRoutes);
router.use("/admin", userProfileRoutes);
router.use("/dispatcher", dispatcherRoutes);

router.use("/",driverRoutes)


module.exports = router;