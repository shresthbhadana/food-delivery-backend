const deliveryChargeRepository = require("../repository/index").deliveryChargeRepo;
  


const createDeliveryCharge =
  async (payload) => {

    if (
      !payload.deliveryCharge
    ) {
      throw new Error(
        "Delivery charge is required"
      );
    }

    if (!payload.startDate) {
      throw new Error(
        "Start date is required"
      );
    }

    if (!payload.endDate) {
      throw new Error(
        "End date is required"
      );
    }

    return await deliveryChargeRepository
      .createDeliveryCharge(
        payload
      );
};

const getAllDeliveryCharges =
  async () => {

    return await deliveryChargeRepository
      .getAllDeliveryCharges();
};

const updateDeliveryCharge =
  async (id, payload) => {

    if (!id) {
      throw new Error(
        "Id is required"
      );
    }

    return await deliveryChargeRepository
      .updateDeliveryCharge(
        id,
        payload
      );
};

const deleteDeliveryCharge =
  async (id) => {

    if (!id) {
      throw new Error(
        "Id is required"
      );
    }

    return await deliveryChargeRepository
      .deleteDeliveryCharge(id);
};

module.exports = {
  createDeliveryCharge,
  getAllDeliveryCharges,
  updateDeliveryCharge,
  deleteDeliveryCharge,
};