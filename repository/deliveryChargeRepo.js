const {
  DeliveryChargeSchedule,
} = require("../models");

const createDeliveryCharge =
  async (payload) => {

    return await DeliveryChargeSchedule
      .create(payload);
};

const getAllDeliveryCharges =
  async () => {

    return await DeliveryChargeSchedule
      .findAll({

        order: [
          ["createdAt", "DESC"],
        ],

      });
};

const updateDeliveryCharge =
  async (id, payload) => {

    await DeliveryChargeSchedule
      .update(payload, {
        where: { id },
      });

    return await DeliveryChargeSchedule
      .findByPk(id);
};

const deleteDeliveryCharge =
  async (id) => {

    return await DeliveryChargeSchedule
      .destroy({
        where: { id },
      });
};

module.exports = {
  createDeliveryCharge,
  getAllDeliveryCharges,
  updateDeliveryCharge,
  deleteDeliveryCharge,
};