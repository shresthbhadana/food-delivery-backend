const cron = require("node-cron");

const { Op } = require("sequelize");

const {
  DeliveryChargeSchedule,
  Setting,
} = require("../models");

cron.schedule("* * * * *", async () => {

  try {

    const now = new Date();

    // START SCHEDULE

    const pendingSchedules =
      await DeliveryChargeSchedule.findAll({

        where: {

          startDate: {
            [Op.lte]: now,
          },

          status: "Pending",
        },

      });

    for (const schedule of pendingSchedules) {

      const setting =
        await Setting.findOne();

      if (setting) {

        await setting.update({

          changeTo:
            setting.deliveryCharge,

          deliveryCharge:
            schedule.deliveryCharge,
        });
      }

      await schedule.update({
        status: "Completed",
      });

      console.log(
        `Delivery charge updated to ${schedule.deliveryCharge}`
      );
    }

    // END SCHEDULE

    const completedSchedules =
      await DeliveryChargeSchedule.findAll({

        where: {

          endDate: {
            [Op.lte]: now,
          },

          status: "Completed",
        },

      });

    for (const schedule of completedSchedules) {

      const setting =
        await Setting.findOne();

      if (setting) {

        await setting.update({

          deliveryCharge:
            setting.changeTo,
        });
      }

      await schedule.destroy();

      console.log(
        `Delivery charge reverted`
      );
    }

  } catch (error) {

    console.log(
      "Cron Error:",
      error.message
    );
  }
});