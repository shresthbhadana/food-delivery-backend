const preOrderRepo = require("../repository/preOrderRepo");

const createPreOrder = async(data)=>{
    if (!data.userId) {
    throw new Error("User Id is required");
  }

  if (!data.vendorId) {
    throw new Error("Vendor Id is required");

  }
  let totalPrice = 0;
  data.items.forEach((item)=>{
    if(!item.price || !item.quantity){
        throw new Error("Item price or quantity is required");
    }
    totalPrice += item.price * item.quantity;
  });
  data.totalPrice = totalPrice;
  data.status = "Pending";
  data.createdAt = Date.now();
  return await preOrderRepo.createPreOrder(data);
};
const updatePreOrder = async(Id,data)=>{
    const order = await preOrderRepo.getPreOrderById(Id);
    if(!order){
        throw new Error("Order not found");
    }
    if(order.status === "Completed"){
        throw new Error("Order is completed");
    }
    return await preOrderRepo.updatePreOrder(Id,data);
}
const getPreOrderById = async(Id) => {
    const order = await preOrderRepo.getPreOrderById(Id);
    if(!order){
        throw new Error("Order not found");
    }
    return order;
}
const getAllPreOrders = async(userId)=>{
    const orders = await preOrderRepo.getAllPreOrderByUserId(userId);
    if(!orders){
        throw new Error("Orders not found");
    }
    return orders;
};
const deletePreOrderById = async(Id) => {
    const order = await preOrderRepo.getPreOrderById(Id);
    if(!order){
        throw new Error("Order not found");
    }
    if(order.status === "Completed"){
        throw new Error("Order is completed");
    }
    return await preOrderRepo.deletePreOrderById(Id);
};
const acceptOrRejectPreOrder = async (
  id,
  status
) => {


  const validStatuses = [
    "Accepted",
    "Rejected",
  ];

  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status");
  }



  const order =
    await preOrderRepo.getPreOrderById(
      id
    );

  if (!order) {
    throw new Error("Order not found");
  }

  

  if (
    order.status === "Accepted" ||
    order.status === "Rejected"
  ) {
    throw new Error(
      "Order already processed"
    );
  }

  

  const updatedOrder =
    await preOrderRepo.acceptOrRejectPreOrder(
      id,
      status
    );

 

  return updatedOrder;
};


const getAllPreOrdersByVendor = async(vendorId) => {
    const orders = await preOrderRepo.getAllPreOrdersByVendor(vendorId);
    if(!orders){
        throw new Error("Orders not found");
    }
    return orders;
};
const adminGetAllPreOrders = async() => {
    const orders = await preOrderRepo.adminGetAllPreOrders();
    if(!orders){
        throw new Error("Orders not found");
    }
    return orders;
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