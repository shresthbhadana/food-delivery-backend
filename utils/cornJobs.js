const cron = require("node-cron");
const { Op } = require("sequelize");
const logger = require("./logger");
const {
  PreOrder,
  order,
  Driver,
  Setting,
  Product,
  DeliveryChargeSchedule,
  ScheduledMessage,
  PromoCode,
  userProfile,
  Notification,
} = require("../models");
const { orderService } = require("../services/index");

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

//preOrder reminder after10 minutes
cron.schedule("*/10 * * * *", async () => {
  try {
    logger.info("Running preOrderReminder job");
    const currentTime = Date.now();
    const oneHourLater = currentTime + 60 * 60 * 1000;

    const preOrders = await PreOrder.findAll({
      where: {
        status: "Accepted",
      },
    });

    for (const preorder of preOrders) {
      let deliveryTime;
      if (typeof preorder.deliverySchedule === "object" && preorder.deliverySchedule?.time) {
        deliveryTime = new Date(preorder.deliverySchedule.time).getTime();
      } else {
        deliveryTime = new Date(preorder.deliverySchedule).getTime();
      }

      if (deliveryTime <= oneHourLater && deliveryTime >= currentTime) {
        logger.info(`Reminder sent for preorder ${preorder.id}, converting to live order`);

        
        await Notification.create({
          userId: preorder.vendorId,
          title: "Pre-order Ready for Processing",
          body: `Pre-order #${preorder.id} is due in 1 hour and has been converted to a live order.`,
          status: "unread",
          createdAt: Date.now(),
        });

        
        const orderPayload = {
          items: preorder.items,
          userName: preorder.userName,
          phoneNumber: preorder.phoneNumber,
          userId: preorder.userId,
          deliveryAddress: preorder.deliveryAddress,
          totalPrice: preorder.totalPrice,
          commissionPercent: preorder.commissionPercent,
          deliveryCharge: preorder.deliveryCharge,
          orderForSomeoneElse: preorder.orderForSomeoneElse || false,
          pickupNumber: preorder.pickupNumber || "",
        };

        try {
          await orderService.createOrder(orderPayload);
          await preorder.update({ status: "Completed" });
          logger.info(`Pre-order #${preorder.id} converted successfully.`);
        } catch (err) {
          logger.error(`Error converting pre-order #${preorder.id} to live order: ${err.message}`);
        }
      }
    }
  } catch (error) {
    logger.error(`preOrderReminder Error: ${error.message}`);
  }
});

//assign driver every in 5min
cron.schedule("*/5 * * * *", async () => {
  try {
    logger.info("Running AutoAssignDriver job");
    const orders = await order.findAll({
      where: {
        status: {
          [Op.in]: ["ready", "accepted"],
        },
      },
    });

    const drivers = await Driver.findAll({
      where: {
        isOnline: true,
      },
    });

    for (const singleOrder of orders) {
      // Check if driver is not assigned (driver JSON column is empty or {})
      if (!singleOrder.driver || Object.keys(singleOrder.driver).length === 0) {
        let nearestDriver = null;
        let minimumDistance = Infinity;

        // Extract coordinates from order deliveryAddress
        const orderLat = parseFloat(singleOrder.deliveryAddress?.latitude) || 0;
        const orderLon = parseFloat(singleOrder.deliveryAddress?.longitude) || 0;

        if (orderLat !== 0 && orderLon !== 0 && drivers.length > 0) {
          for (const driver of drivers) {
            const driverLat = parseFloat(driver.location?.latitude) || 0;
            const driverLon = parseFloat(driver.location?.longitude) || 0;

            if (driverLat !== 0 && driverLon !== 0) {
              const distance = haversineDistance(orderLat, orderLon, driverLat, driverLon);
              if (distance < minimumDistance) {
                minimumDistance = distance;
                nearestDriver = driver;
              }
            }
          }
        }

        if (nearestDriver) {
          await singleOrder.update({
            driver: {
              id: nearestDriver.id,
              vehicleType: nearestDriver.vehicleType || "Motorcycle",
              vehicleNumber: nearestDriver.vehicleNumber || "",
              assignedAt: Date.now(),
            },
          });

          // Notify driver
          await Notification.create({
            userId: nearestDriver.id,
            title: "New Order Assigned",
            body: `Order #${singleOrder.id} has been assigned to you.`,
            status: "unread",
            createdAt: Date.now(),
          });

          logger.info(`Driver ${nearestDriver.id} assigned to order ${singleOrder.id} (Distance: ${minimumDistance.toFixed(2)}km)`);
        }
      }
    }
  } catch (error) {
    logger.error(`AutoAssignDriver Error: ${error.message}`);
  }
});


//update delivery charge every 5min
cron.schedule("*/5 * * * *", async () => {
  try {
    logger.info("Running updateDeliveryCharges job");
    const now = new Date();

    // 1. Pending schedules starting now
    const pendingSchedules = await DeliveryChargeSchedule.findAll({
      where: {
        startDate: {
          [Op.lte]: now,
        },
        status: "Pending",
      },
    });

    for (const schedule of pendingSchedules) {
      const setting = await Setting.findOne();
      if (setting) {
        await setting.update({
          changeTo: setting.deliveryCharge,
          deliveryCharge: schedule.deliveryCharge,
        });
      }
      await schedule.update({ status: "Completed" });
      logger.info(`Delivery charge updated to ${schedule.deliveryCharge} per schedule ${schedule.id}`);
    }

    // 2. Completed schedules expiring now
    const expiringSchedules = await DeliveryChargeSchedule.findAll({
      where: {
        endDate: {
          [Op.lte]: now,
        },
        status: "Completed",
      },
    });

    for (const schedule of expiringSchedules) {
      const setting = await Setting.findOne();
      if (setting) {
        await setting.update({
          deliveryCharge: setting.changeTo,
        });
      }
      await schedule.destroy();
      logger.info(`Delivery charge override expired & reverted to base charge.`);
    }
  } catch (error) {
    logger.error(`updateDeliveryCharges Error: ${error.message}`);
  }
});

//schedule engaging message
cron.schedule("*/5 * * * *", async () => {
  try {
    logger.info("Running scheduleEngagingMessages job");
    const currentDate = new Date();

    const messages = await ScheduledMessage.findAll({
      where: {
        isActive: true,
        scheduledTime: {
          [Op.lte]: currentDate,
        },
      },
    });

    if (messages.length === 0) return;

    // Fetch all non-anonymous, non-deleted users
    const users = await userProfile.findAll({
      where: {
        isAnonymous: false,
        deleted: false,
      },
    });

    for (const message of messages) {
      for (const user of users) {
        // Skip admin users
        if (user.roles && user.roles.includes("admin")) continue;

        await Notification.create({
          userId: user.id,
          title: message.title,
          body: message.message,
          status: "unread",
          createdAt: Date.now(),
        });
      }
      logger.info(`Engaging message '${message.title}' sent to ${users.length} users.`);

      // Handle recurrence
      if (message.frequency === "once") {
        await message.update({ isActive: false });
      } else {
        let nextTime = new Date(message.scheduledTime);
        if (message.frequency === "daily") {
          nextTime.setDate(nextTime.getDate() + 1);
        } else if (message.frequency === "every-2-days") {
          nextTime.setDate(nextTime.getDate() + 2);
        } else if (message.frequency === "every-weeks") {
          nextTime.setDate(nextTime.getDate() + 7);
        } else if (message.frequency === "every-months") {
          nextTime.setMonth(nextTime.getMonth() + 1);
        }
        await message.update({ scheduledTime: nextTime });
        logger.info(`Recurring message rescheduled for ${nextTime.toISOString()}`);
      }
    }
  } catch (error) {
    logger.error(`scheduleEngagingMessages Error: ${error.message}`);
  }
});

//update commmision price
const updateProductPricesOnCommissionChange = async (commissionPercentage) => {
  try {
    logger.info(`Updating product prices after commission change to ${commissionPercentage}%`);
    const products = await Product.findAll();

    for (const product of products) {
      if (product.vendorPrice && !isNaN(product.vendorPrice)) {
        const updatedPrice = product.vendorPrice * (1 + commissionPercentage / 100);
        await product.update({
          price: parseFloat(updatedPrice.toFixed(2)),
        });
      }
    }
    logger.info("All product prices recalculated and updated successfully.");
  } catch (error) {
    logger.error(`updateProductPrices Error: ${error.message}`);
  }
};

//expires promocode daily at 12am
cron.schedule("0 0 * * *", async () => {
  try {
    logger.info("Running expirePromoCodes job");
    const [updatedCount] = await PromoCode.update(
      {
        status: "Expired",
      },
      {
        where: {
          status: "Active",
          expiryDate: {
            [Op.lt]: new Date(),
          },
        },
      }
    );
    logger.info(`Expired ${updatedCount} past-due promo codes.`);
  } catch (error) {
    logger.error(`expirePromoCodes Error: ${error.message}`);
  }
});

module.exports = {
  updateProductPricesOnCommissionChange,
};