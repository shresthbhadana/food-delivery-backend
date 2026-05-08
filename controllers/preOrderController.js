const { preOrderService } = require("../services");
const logger = require("../utils/logger");

const createPreOrder = async(req,res)=>{
    try {
        logger.info("create preOrder api called");
        const payload = {
            userId  : req.user?.id || req.body.userId,
            userName : req.body.userName,
            phoneNumber : req.body.phoneNumber,
            vendorId : req.body.vendorId,
            items : req.body.items,
            deliveryAddress : req.body.deliveryAddress,
            deliverySchedule : req.body.deliverySchedule,
            commissionPercent : req.body.commissionPercent,
            deliveryCharge : req.body.deliveryCharge,
            orderForSomeoneElse : req.body.orderForSomeoneElse,
            pickupNumber : req.body.pickupNumber,
            remark : req.body.remark,
            promoCodeId : req.body.promoCodeId,
        };
        const response = await preOrderService.createPreOrder(payload);
        logger.info(`PreOrder created : ${response.id}`);
        return res.status(201).json({
            success : true,
            message : "PreOrder created successfully",
            data : response,
        })
    }catch(error){
        logger.error(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
}
const updatePreOrder = async (
  req,
  res
) => {

  try {

    logger.info(
      `Update PreOrder API Called : ${req.params.id}`
    );


    const payload = {

      items:
        req.body.items,

      deliveryAddress:
        req.body.deliveryAddress,

      deliverySchedule:
        req.body.deliverySchedule,

      remark:
        req.body.remark,

      pickupNumber:
        req.body.pickupNumber,

      orderForSomeoneElse:
        req.body.orderForSomeoneElse,
    };

    const response =
      await preOrderService.updatePreOrder(
        req.params.id,
        payload
      );

    logger.info(
      `PreOrder Updated : ${req.params.id}`
    );

    return res.status(200).json({
      success: true,
      message:
        "PreOrder updated successfully",
      data: response,
    });

  } catch (error) {

    logger.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getPreOrderById = async (
  req,
  res
) => {

  try {

    logger.info(
      `Get PreOrder By Id API Called : ${req.params.id}`
    );

    const response =
      await preOrderService.getPreOrderById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data: response,
    });

  } catch (error) {

    logger.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllPreOrders = async (
  req,
  res
) => {

  try {

    logger.info(
      `Get All User PreOrders API Called : ${req.user?.id}`
    );

    const response =
      await preOrderService.getAllPreOrders(
        req.user?.id || req.query.userId
      );

    return res.status(200).json({
      success: true,
      total: response.length,
      data: response,
    });

  } catch (error) {

    logger.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deletePreOrderById =
  async (req, res) => {

    try {

      logger.info(
        `Delete PreOrder API Called : ${req.params.id}`
      );

      await preOrderService.deletePreOrderById(
        req.params.id
      );

      logger.info(
        `PreOrder Deleted : ${req.params.id}`
      );

      return res.status(200).json({
        success: true,
        message:
          "PreOrder deleted successfully",
      });

    } catch (error) {

      logger.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  const acceptOrRejectPreOrder =
    async (req, res) => {
  
      try {
  
        logger.info(
          `Accept Or Reject PreOrder API Called : ${req.params.id}`
        );
  
        const payload = {
          status:
            req.body.status,
        };
  
        const response =
          await preOrderService.acceptOrRejectPreOrder(
            req.params.id,
            payload.status
          );
  
        logger.info(
          `PreOrder Status Updated : ${req.params.id}`
        );
  
        return res.status(200).json({
          success: true,
          message:
            "PreOrder status updated successfully",
          data: response,
        });
  
      } catch (error) {
  
        logger.error(error);
  
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  
  
  const getAllPreOrdersByVendor =
    async (req, res) => {
  
      try {
  
        logger.info(
          `Get Vendor PreOrders API Called : ${req.user?.id}`
        );
  
        const response =
          await preOrderService.getAllPreOrdersByVendor(
            req.user?.id || req.query.vendorId
          );
  
        return res.status(200).json({
          success: true,
          total: response.length,
          data: response,
        });
  
      } catch (error) {
  
        logger.error(error);
  
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  
  
  const adminGetAllPreOrders =
    async (req, res) => {
  
      try {
  
        logger.info(
          "Admin Get All PreOrders API Called"
        );
  
        const response =
          await preOrderService.adminGetAllPreOrders();
  
        return res.status(200).json({
          success: true,
          total: response.length,
          data: response,
        });
  
      } catch (error) {
  
        logger.error(error);
  
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    };
  
  module.exports = {
    createPreOrder,
    updatePreOrder,
    getPreOrderById,
    getAllPreOrders,
    deletePreOrderById,
    acceptOrRejectPreOrder,
    getAllPreOrdersByVendor,
    adminGetAllPreOrders,
  };