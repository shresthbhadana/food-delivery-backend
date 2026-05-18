const { globalService } = require("../services/index");
const logger = require("../utils/logger");

const getSettings = async (req, res) => {
  try {
    const response = await globalService.getSettings();
    logger.info("Settings fetched successfully");
    return res.status(200).json({
      success: true,
      message: "Settings fetched successfully",
      data: response,
    });
  } catch (error) {
    logger.error(`Something went wrong in fetching settings : ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateCommission = async (req, res) => {
  const { id } = req.params;
  const { commissionPercentage } = req.body;
  try {
    const response = await globalService.updateCommission(id, commissionPercentage);
    logger.info("Commission updated successfully");
    return res.status(200).json({
      success: true,
      message: "Commission updated successfully",
      data: response,
    });
  } catch (error) {
    logger.error(`Something went wrong in updating commission : ${error}`);
    if(error.message.includes("required") || error.message.includes("between")){
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    if(error.message.includes("not found")){
      return res.status(404).json({
        success: false,
        message: "Settings not found",
        error: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateDeliveryCharge = async (req, res) => {
  const { id } = req.params;
  const { deliveryCharge } = req.body;
  try {
    const response = await globalService.updateDeliveryCharge(id, deliveryCharge);
    logger.info("Delivery charge updated successfully");
    return res.status(200).json({
      success: true,
      message: "Delivery charge updated successfully",
      data: response,
    });
  } catch (error) {
    logger.error(`Something went wrong in updating delivery charge : ${error}`);
    if(error.message.includes("required") || error.message.includes("greater than")){
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    if(error.message.includes("not found")){
      return res.status(404).json({
        success: false,
        message: "Settings not found",
        error: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getSettings,
  updateCommission,
  updateDeliveryCharge,
};
