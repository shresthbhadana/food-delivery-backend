const promoCodeService = require("../services").promoCodeService;
const logger = require("../utils/logger");

const createPromoCode = async (
  req,
  res
) => {

  try {

    const payload = {

      code: req.body.code,

      description:
        req.body.description,

      discountType:
        req.body.discountType,

      discountValue:
        req.body.discountValue,

      expiryDate:
        req.body.expiryDate,

      conditions:
        req.body.conditions,

      minPrice:
        req.body.minPrice,

      status:
        req.body.status,

      createdAt: Date.now(),
    };

    logger.info(
      `Creating Promo Code: ${payload.code}`
    );

    const response =
      await promoCodeService
        .createPromoCode(payload);

    return res.status(201).json({
      success: true,
      data: response,
    });

  } catch (error) {

    logger.error(
      `Create Promo Code Error: ${error.message}`
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPromoCodes = async (req, res) => {
  try {
    const response = await promoCodeService.getAllPromoCodes();
    logger.info(`Fetched all Promo Codes (admin)`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Get All Promo Codes Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getPromoCodeById = async (req, res) => {
  try {
    const response = await promoCodeService.getPromoCodeById(req.params.id);
    logger.info(`Fetched Promo Code: ${req.params.id}`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Get Promo Code Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const updatePromoCode = async (
  req,
  res
) => {

  try {

    const payload = {

      code: req.body.code,

      description:
        req.body.description,

      discountType:
        req.body.discountType,

      discountValue:
        req.body.discountValue,

      expiryDate:
        req.body.expiryDate,

      conditions:
        req.body.conditions,

      minPrice:
        req.body.minPrice,

      status:
        req.body.status,
    };

    const response =
      await promoCodeService
        .updatePromoCode(
          req.params.id,
          payload
        );

    logger.info(
      `Promo Code updated: ${req.params.id}`
    );

    return res.status(200).json({
      success: true,
      data: response,
    });

  } catch (error) {

    logger.error(
      `Update Promo Code Error: ${error.message}`
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deletePromoCode = async (
  req,
  res
) => {
  try {
    const response = await promoCodeService.deletePromoCode(req.params.id);
    logger.info(`Promo Code deleted: ${req.params.id}`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Delete Promo Code Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getActivePromoCodes = async (req, res) => {
  try {
    const response = await promoCodeService.getActivePromoCodes();
    logger.info(`Fetched active Promo Codes (customer)`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Get Active Promo Codes Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPromoCode,
  getAllPromoCodes,
  getPromoCodeById,
  updatePromoCode,
  deletePromoCode,
  getActivePromoCodes,
};