const paymentService =
  require("../services/index").paymentService;

  const logger = require("../utils/logger")

const initiatePayment =
  async (req, res) => {

    try {

      const payload = {

        orderId:
          req.body.orderId,

        userId:
          req.user?.id ||
          req.body.userId,

        amount:
          req.body.amount,

        currency:
          req.body.currency,

        status:
          req.body.status,

        gatewayTransactionId:
          req.body
            .gatewayTransactionId,

        paymentMethod:
          req.body.paymentMethod,

        createdAt:
          Date.now(),
      };

      const response =
        await paymentService
          .initiatePayment(
            payload
          );
logger.info("payment initiated successfully")
      return res.status(201)
        .json({

          success: true,
          data: response,

        });

    } catch (error) {
        logger.error(" error in intiating payment")

      return res.status(500)
        .json({

          success: false,
          message:
            error.message,

        });
    }
};

const getPaymentByOrderId =
  async (req, res) => {

    try {

      const response =
        await paymentService
          .getPaymentByOrderId(
            req.params.orderId
          );
logger.info("payment by order id fetched successfully")
      return res.status(200)
        .json({

          success: true,
          data: response,

        });

    } catch (error) {
logger.error("error in fetching the payment by orderId")
      return res.status(500)
        .json({

          success: false,
          message:
            error.message,

        });
    }
};

const refundPayment =
  async (req, res) => {

    try {

      const response =
        await paymentService
          .refundPayment(
            req.params.id
          );
logger.info("payment refunnded successfully")
      return res.status(200)
        .json({

          success: true,
          data: response,

        });

    } catch (error) {
logger.error("error in refunding the payment")
      return res.status(500)
        .json({

          success: false,
          message:
            error.message,

        });
    }
};

const getAllPayments =
  async (req, res) => {

    try {

      const filters = {

        status:
          req.query.status,

        paymentMethod:
          req.query
            .paymentMethod,
      };

      const response =
        await paymentService
          .getAllPayments(
            filters
          );
logger.info("all payments fetched successfully")
      return res.status(200)
        .json({

          success: true,
          data: response,

        });

    } catch (error) {
logger.error("error in fetching all the payments")
      return res.status(500)
        .json({

          success: false,
          message:
            error.message,

        });
    }
};

module.exports = {
  initiatePayment,
  getPaymentByOrderId,
  refundPayment,
  getAllPayments,
};