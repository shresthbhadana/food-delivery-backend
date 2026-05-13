const db = require("../models/index");
const { PromoCode } = db;
const createPromoCode = async(body)=>{
    return await PromoCode.create(body)
}

const getAllPromoCode = async()=>{
    return await PromoCode.findAll()
};
const getPromoCodeById = async(id)=>{
    return await PromoCode.findByPk(id)
};
const updatePromoCode = async(id,body)=>{
     await PromoCode.update(body,{where:{id}})
     return await PromoCode.findByPk(id)
};

const deletePromoCode = async(id)=>{
    return await PromoCode.destroy({ where: { id } });
};

const { Op } = require("sequelize");

const getAllActivePromoCodes = async () => {
  return await PromoCode.findAll({
    where: {
      status: "Active",
      expiryDate: {
        [Op.gt]: new Date(),
      },
    },
    order: [["createdAt", "DESC"]],
  });
};

module.exports = {
  createPromoCode,
  getAllPromoCode,
  getPromoCodeById,
  updatePromoCode,
  deletePromoCode,
  getAllActivePromoCodes,
};
