const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const db = {};

db.sequelize = sequelize;


db.PreOrder = require("./preOrderModel")(sequelize, DataTypes);
db.order = require("./orderModel")(sequelize,DataTypes)
db.vendorOrder = require("./vendorModel")(sequelize,DataTypes)


module.exports = db;