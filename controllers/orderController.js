const {orderService} = require("../services/index");
const logger = require("../utils/logger");

const createOrder = async (
  req,
  res
) => {
  try {
    logger.info("Create Order API Called");
    const response =
      await orderService.createOrder(
        req.body
      );

    logger.info(`Order Created Successfully : ${response.id}`);
    return res.status(201).json({
      success: true,
      data: response,
    });

  } catch (error) {
    logger.error(`Create Order API Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatus =
  async (req, res) => {
    try {
      logger.info(`Update Order Status API Called for Order: ${req.body.orderId}`);
      const response =
        await orderService.updateOrderStatus(
          req.body.orderId,
          req.body.status
        );

      logger.info(`Order Status Updated : ${req.body.orderId}`);
      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
      logger.error(`Update Order Status API Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

const adminGetAllOrders =
  async (req, res) => {
    try {
      logger.info("Admin Get All Orders API Called");
      const response =
        await orderService.adminGetAllOrders(
          req.query
        );

      return res.status(200).json({
        success: true,
        total: response.length,
        data: response,
      });

    } catch (error) {
      logger.error(`Admin Get All Orders API Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

const adminGetOrderById =
  async (req, res) => {
    try {
      logger.info(`Admin Get Order By Id API Called : ${req.params.id}`);
      const response =
        await orderService.adminGetOrderById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
      logger.error(`Admin Get Order By Id API Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

const getLiveOrderById =
  async (req, res) => {
    try {
      logger.info(`Get Live Order By Id API Called : ${req.params.id}`);
      const response =
        await orderService.getLiveOrderById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
      logger.error(`Get Live Order By Id API Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: error.message,
    })}
  };

const getAllLiveOrders =
  async (req, res) => {
    try {
      const userId = req.user?.id || req.query.userId;
      logger.info(`Get All Live Orders API Called for User: ${userId}`);
      const response =
        await orderService.getAllLiveOrders(
          userId
        );

      return res.status(200).json({
        success: true,
        total: response.length,
        data: response,
      });

    } catch (error) {
      logger.error(`Get All Live Orders API Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

const getVendorOrders =
  async (req, res) => {
    try {
      const vendorId = req.user?.id || req.query.vendorId;
      logger.info(`Get Vendor Orders API Called for Vendor: ${vendorId}`);
      const response =
        await orderService.getVendorOrders(
          vendorId
        );

      return res.status(200).json({
        success: true,
        total: response.length,
        data: response,
      });

    } catch (error) {
      logger.error(`Get Vendor Orders API Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

const getVendorOrderById =
  async (req, res) => {
    try {
      logger.info(`Get Vendor Order By Id API Called : ${req.params.id}`);
      const response =
        await orderService.getVendorOrderById(
          req.params.id
        );

      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
      logger.error(`Get Vendor Order By Id API Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  createOrder,
  updateOrderStatus,
  adminGetAllOrders,
  adminGetOrderById,
  getLiveOrderById,
  getAllLiveOrders,
  getVendorOrders,
  getVendorOrderById,
};