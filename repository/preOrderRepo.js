const db = require("../models/index");
const preOrder = db.PreOrder; 

const createPreOrder =  async(data) =>{
    return await preOrder.create(data);
}

const updatePreOrder = async(id ,data)=>{
    await preOrder.update(data,{
        where : {id},
    })
    return await preOrder.findByPk(id);
}

const getPreOrderById = async(id)=>{
    return await preOrder.findByPk(id);
}
const getAllPreOrderByUserId = async(userId)=>{
    return await preOrder.findAll({
        where : {userId : userId},
        order : [["createdAt","DESC"]]
    })
}
const deletePreOrderById = async (id) => {
  return await preOrder.destroy({
    where: { id },
  });
};

const acceptOrRejectPreOrder = async (
  id,
  status
) => {
  await preOrder.update(
    { status },
    {
      where: { id },
    }
  );

  return await preOrder.findByPk(id);
};

const getAllPreOrdersByVendor = async (
  vendorId
) => {
  return await preOrder.findAll({
    where: { vendorId },
    order: [["createdAt", "DESC"]],
  });
};

const adminGetAllPreOrders = async () => {
  return await preOrder.findAll({
    order: [["createdAt", "DESC"]],
  });
};

module.exports = {
  createPreOrder,
  updatePreOrder,
  getPreOrderById,
  getAllPreOrderByUserId,
  deletePreOrderById,
  acceptOrRejectPreOrder,
  getAllPreOrdersByVendor,
  adminGetAllPreOrders,
};
