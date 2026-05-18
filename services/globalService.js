const globalRepo = require("../repository/index").globalRepo;

const getSettings = async () => {

  return await globalRepo.getSettings();
};

const updateCommission = async (
  id,
  commissionPercentage
) => {
    if(!id){
        throw new Error("Id is required")
    }
if(
  commissionPercentage > 100 || commissionPercentage < 0
){
  throw new Error("Commission percentage must be between 0 and 100");
}

  const update =  await globalRepo.updateCommission(
    id,
    commissionPercentage
  );
  return update
};

const updateDeliveryCharge = async (
  id,
  deliveryCharge
) => {
if(!id){
    throw new Error("Id ias required")
}
if(deliveryCharge <0){
    throw new Error("DeliveryCharge must be greater than 0")
}
  return await globalRepo.updateDeliveryCharge(
    id,
    deliveryCharge
  );
};

const createDefaultSettings = async () => {
  return await globalRepo.createDefaultSettings();
};

module.exports = {
  getSettings,
  updateCommission,
  updateDeliveryCharge,
  createDefaultSettings,
};