const preOrderRepo = require('./preOrderRepo');
const orderRepo = require('./orderRepo');
const userRepo = require("./userProfile");
const restroRepo = require("./restroRepo");
const productRepo = require("./productaRepo");
const driverRepo = require("./driverRepo");
const promoCodeRepo = require("./promocodeRepo");

module.exports = {
  preOrderRepo,
  orderRepo,
  userRepo,
  restroRepo,
  productRepo,
  driverRepo,
  promoCodeRepo
};