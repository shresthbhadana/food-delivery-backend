const db = require("../models");

const Order = db.order;
const VendorOrder = db.vendorOrder;



const createOrder = async (data) => {
  return await Order.create(data);
};

const getOrderById = async (id) => {
  return await Order.findByPk(id);
};

const updateOrder = async (
  id,
  data
) => {
  await Order.update(data, {
    where: { id },
  });

  return await Order.findByPk(id);
};

const getAllOrders = async (
  filters = {}
) => {
  return await Order.findAll({
    where: filters,

    order: [["createdAt", "DESC"]],
  });
};



const createVendorOrder = async (
  data
) => {
  return await VendorOrder.create(data);
};

const getVendorOrders = async (
  vendorId
) => {
  return await VendorOrder.findAll({
    where: { vendorId },

    order: [["createdAt", "DESC"]],
  });
};

const getVendorOrderById = async (
  id
) => {
  return await VendorOrder.findByPk(id);
};

const updateVendorOrder = async (
  id,
  data
) => {
  await VendorOrder.update(data, {
    where: { id },
  });

  return await VendorOrder.findByPk(id);
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  getAllOrders,

  createVendorOrder,
  getVendorOrders,
  getVendorOrderById,
  updateVendorOrder,
};