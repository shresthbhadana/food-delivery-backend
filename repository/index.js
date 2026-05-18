const preOrderRepo = require('./preOrderRepo');
const orderRepo = require('./orderRepo');
const userRepo = require("./userProfile");
const restroRepo = require("./restroRepo");
const productRepo = require("./productaRepo");
const driverRepo = require("./driverRepo");
const promoCodeRepo = require("./promocodeRepo");
const globalRepo = require("./globalRepo");
const deliveryChargeRepo = require("./deliveryChargeRepo");
const scheduleRepo = require("./scheduleRepo");
const appVersionRepo = require("./appVersionRepo");
const popularMealRepo = require("./popularMealRepo");
const paymentRepo = require("./paymentRepo");

module.exports = {
  preOrderRepo,
  orderRepo,
  userRepo,
  restroRepo,
  productRepo,
  driverRepo,
  promoCodeRepo,
  globalRepo,
  deliveryChargeRepo,
  scheduleRepo,
  appVersionRepo,
  popularMealRepo,
  paymentRepo,
};