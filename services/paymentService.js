const paymentRepository = require("../repository/index").paymentRepo;

const initiatePayment =
  async (payload) => {

    if (!payload.orderId) {
      throw new Error(
        "Order id is required"
      );
    }

    if (!payload.userId) {
      throw new Error(
        "User id is required"
      );
    }

    if (!payload.amount) {
      throw new Error(
        "Amount is required"
      );
    }

    return await paymentRepository
      .createPayment(payload);
};

const getPaymentByOrderId =
  async (orderId) => {

    if (!orderId) {
      throw new Error(
        "Order id is required"
      );
    }

    return await paymentRepository
      .getPaymentByOrderId(
        orderId
      );
};

const refundPayment =
  async (id) => {

    if (!id) {
      throw new Error(
        "Payment id is required"
      );
    }

    return await paymentRepository
      .refundPayment(
        id,
        {
          status:
            "refunded",

          updatedAt:
            Date.now(),
        }
      );
};

const getAllPayments =
  async (filters) => {

    return await paymentRepository
      .getAllPayments(
        filters
      );
};

module.exports = {
  initiatePayment,
  getPaymentByOrderId,
  refundPayment,
  getAllPayments,
};