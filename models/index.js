const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const db = {};

db.sequelize = sequelize;
db.Product = require("./propductModel")(
  sequelize,
  DataTypes
);

db.ProductReview = require(
  "./productReviewModel"
)(
  sequelize,
  DataTypes
);


db.Product.hasMany(db.ProductReview, {
  foreignKey: "productId",
});

db.ProductReview.belongsTo(db.Product, {
  foreignKey: "productId",
});


db.PreOrder = require("./preOrderModel")(sequelize, DataTypes);
db.order = require("./orderModel")(sequelize,DataTypes)
db.vendorOrder = require("./vendorModel")(sequelize,DataTypes);
db.userProfile = require("./userProfileModel")(sequelize,DataTypes)
db.Dispatcher = require("./dispatcherModel");
db.restro = require("./resModel")(sequelize, DataTypes); 
db.Vendor = db.vendorOrder; 


module.exports = db;