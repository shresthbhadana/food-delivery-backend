const  {Setting} = require("../models/index");

const getSettings = async () => {

  return await Setting.findAll();
};
const updateCommission = async (
  id,
  commissionPercentage
) => {

  const [affectedCount] = await Setting.update(
    {
      commissionPercentage,
    },
    {
      where: { id },
    }
  );
  
  if (affectedCount === 0) {
    throw new Error("Settings not found");
  }
  return affectedCount;
};

const updateDeliveryCharge = async (id, deliveryCharge) => {
  const setting = await Setting.findByPk(id);
  if (!setting) {
    throw new Error("Settings not found");
  }

  return await setting.update({
    deliveryCharge,
  });
};

const createDefaultSettings = async () => {
  const settingsCount = await Setting.count();
  if (settingsCount === 0) {
    console.log("No settings found, creating default settings...");
    return await Setting.create({
      commissionPercentage: 10,
      deliveryCharge: 20,
    });
  }
};

module.exports = {
  getSettings,
  updateCommission,
  updateDeliveryCharge,
  createDefaultSettings,
};
