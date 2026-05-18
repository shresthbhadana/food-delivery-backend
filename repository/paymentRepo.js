
const {Payment} = require("../models/index");
const createPayment =
  async (payload) => {

    return await Payment
      .create(payload);
};

const getPaymentByOrderId =
  async (orderId) => {

    return await Payment
      .findOne({

        where: { orderId },

      });
};

const refundPayment =
  async (
    id,
    payload
  ) => {

    await Payment.update(
      payload,
      {
        where: { id },
      }
    );

    return await Payment
      .findByPk(id);
};

const getAllPayments =
  async (filters) => {

    const where = {};

    if (filters.status) {
      where.status =
        filters.status;
    }

    if (
      filters.paymentMethod
    ) {
      where.paymentMethod =
        filters.paymentMethod;
    }

    return await Payment
      .findAll({

        where,

        order: [
          ["createdAt", "DESC"],
        ],

      });
};

module.exports = {
  createPayment,
  getPaymentByOrderId,
  refundPayment,
  getAllPayments,
};