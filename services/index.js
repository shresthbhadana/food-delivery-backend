const preOrderService = require("./preOrderService");
const orderService = require("./orderService");
const userService = require("./userProfile");
const restroService = require("./restroService");
const productService =  require("./productService");
const driverService = require("./driverService");
const promoCodeService = require("./promoCodeService");
const notificationService = require("./notificationService");
const globalService  = require("./globalService");
const deliveryChargeService = require("./deliveryChargeService");



module.exports = {
    preOrderService,
    orderService,
    userService,
    restroService,
    productService,
    driverService,
    promoCodeService,
    notificationService,
    globalService,
    deliveryChargeService,
};