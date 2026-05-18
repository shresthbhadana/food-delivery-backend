const {deliveryChargeService} = require("../services/index");
const logger = require("../utils/logger");

const createDeliveryCharge =
  async (req, res) => {

    try {

      const payload = {

        deliveryCharge:
          req.body.deliveryCharge,

        startDate:
          req.body.startDate,

        endDate:
          req.body.endDate,

        status:
          req.body.status,
      };

      const response =
        await deliveryChargeService
          .createDeliveryCharge(
            payload
          );
      logger.info("Delivery charge created successfully");
      return res.status(201).json({
        success: true,
        data: response,
      });

    } catch (error) {
logger.error(`Something went wrong in creating delivery charge : ${error}`);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

const getAllDeliveryCharges =
  async (req, res) => {

    try {

      const response =
        await deliveryChargeService
          .getAllDeliveryCharges();

      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
logger.error("something went wrong while fetching del;iverycharges")
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

const updateDeliveryCharge =
  async (req, res) => {

    try {

      const payload = {

        deliveryCharge:
          req.body.deliveryCharge,

        startDate:
          req.body.startDate,

        endDate:
          req.body.endDate,

        status:
          req.body.status,
      };

      const response =
        await deliveryChargeService
          .updateDeliveryCharge(
            req.params.id,
            payload
          );
logger.info("delivery charge updated successfully")
      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
logger.error("something went wrong while updating ")
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

const deleteDeliveryCharge =
  async (req, res) => {

    try {

      const response =
        await deliveryChargeService
          .deleteDeliveryCharge(
            req.params.id
          );
logger.info("delivery charge deleted successfully")
      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
logger.error("something went wrong while deleting the delivery charge")
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

module.exports = {
  createDeliveryCharge,
  getAllDeliveryCharges,
  updateDeliveryCharge,
  deleteDeliveryCharge,
};