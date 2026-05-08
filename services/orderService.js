const { v4: uuidv4 } =
  require("uuid");

const orderRepository =
  require("../repository/orderRepo");



const createOrder = async (data) => {

  if (
    !data.items ||
    data.items.length === 0
  ) {
    throw new Error("Items required");
  }


  const vendorMap = {};

  data.items.forEach((item) => {

    const vendorId =
      item.vendorId;

    if (!vendorMap[vendorId]) {
      vendorMap[vendorId] = [];
    }

    vendorMap[vendorId].push(item);
  });



  const orderPayload = {

    ...data,

    id: uuidv4(),

    status: "not_accepted",

    createdAt: Date.now(),

    orderStatusState: {},

    statusCount: {},
  };

  const order =
    await orderRepository.createOrder(
      orderPayload
    );

 

  for (const vendorId in vendorMap) {

    const vendorItems =
      vendorMap[vendorId];

    let totalPrice = 0;

    vendorItems.forEach((item) => {
      totalPrice +=
        item.price * item.quantity;
    });

    await orderRepository.createVendorOrder(
      {
        id: uuidv4(),

        orderId: order.id,

        vendorId,

        items: vendorItems,

        status: "not_accepted",

        totalPrice,

        userName:
          data.userName,

        userId:
          data.userId,

        deliveryAddress:
          data.deliveryAddress,

        createdAt: Date.now(),
      }
    );
  }

  return order;
};



const updateOrderStatus = async (
  orderId,
  newStatus
) => {

  const order =
    await orderRepository.getOrderById(
      orderId
    );

  if (!order) {
    throw new Error("Order not found");
  }

 

  const validTransitions = {

    not_accepted: [
      "accepted",
      "cancelled",
    ],

    accepted: [
      "ready",
      "cancelled",
    ],

    ready: [
      "fulfilled",
    ],

    fulfilled: [],

    cancelled: [],
  };

  if (
    !validTransitions[
      order.status
    ].includes(newStatus)
  ) {
    throw new Error(
      "Invalid status transition"
    );
  }

  return await orderRepository.updateOrder(
    orderId,
    {
      status: newStatus,
    }
  );
};



const adminGetAllOrders =
  async (filters) => {

    return await orderRepository.getAllOrders(
      filters
    );
  };

const adminGetOrderById =
  async (id) => {

    return await orderRepository.getOrderById(
      id
    );
  };


const getLiveOrderById =
  async (id) => {

    return await orderRepository.getOrderById(
      id
    );
  };

const getAllLiveOrders =
  async (userId) => {

    return await orderRepository.getAllOrders(
      {
        userId,
      }
    );
  };



const getVendorOrders =
  async (vendorId) => {

    return await orderRepository.getVendorOrders(
      vendorId
    );
  };

const getVendorOrderById =
  async (id) => {

    return await orderRepository.getVendorOrderById(
      id
    );
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