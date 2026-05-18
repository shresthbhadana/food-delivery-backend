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

db.Driver = require("./driverModel")(
  sequelize,
  DataTypes
);
db.PromoCode = require(
  "./promoCodeModel"
)(
  sequelize,
  DataTypes
);

db.PromoCodeUsage = require(
  "./promoCodeUsageModel"
)(
  sequelize,
  DataTypes
);


db.PromoCode.hasMany(
  db.PromoCodeUsage,
  {
    foreignKey: "promoCodeId",
  }
);

db.PromoCodeUsage.belongsTo(
  db.PromoCode,
  {
    foreignKey: "promoCodeId",
  }
);
db.Notification = require(
  "./notificationModel"
)(
  sequelize,
  DataTypes
);
db.Setting = require(
  "./globalModel"
)(
  sequelize,
  DataTypes
);
db.DeliveryChargeSchedule =
  require(
    "./deliveryChargeModel"
  )(
    sequelize,
    DataTypes
  );
db.ScheduledMessage = require(
  "./scheduleMessageModel"
)(
  sequelize,
  DataTypes
);

module.exports = db;