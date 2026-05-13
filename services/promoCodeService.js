
const promoCodeRepo = require("../repository").promoCodeRepo;
const  createPromoCode = async (body) => {
   if(!body) throw new Error("body is required");
   return await promoCodeRepo.createPromoCode(body);
}
const getAllPromoCodes = async()=>{
    return await promoCodeRepo.getAllPromoCode();
};
const getPromoCodeById = async(id)=>{
    if(!id) throw new Error("id is required");
    return await promoCodeRepo.getPromoCodeById(id);
};
const updatePromoCode = async(id, body)=>{
    if(!id || !body) throw new Error("id and body are required");
    return await promoCodeRepo.updatePromoCode(id, body);
};
const deletePromoCode = async(id)=>{
    if(!id) throw new Error("id is required");
    return await promoCodeRepo.deletePromoCode(id);
};
const getActivePromoCodes = async () => {
  const promoCodes = await promoCodeRepo.getAllActivePromoCodes();
  return promoCodes;
};

module.exports = {
    createPromoCode,
    getAllPromoCodes,
    getPromoCodeById,
    updatePromoCode,
    deletePromoCode,
    getActivePromoCodes
}
