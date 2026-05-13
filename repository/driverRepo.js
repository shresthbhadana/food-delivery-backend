const  db = require("../models/index");
const { Driver } = db;

const getAllDrivers = async()=>{
    return await Driver.findAll();
}
const getDriverById = async(id)=>{
    return await Driver.findByPk(id);
}
const updateDriver = async(id,body)=>{
    await Driver.update(body,{where:{id}});
    return await Driver.findByPk(id);
};
const deleteDriver = async(id)=>{
    return await Driver.destroy({where:{id}});
}
const setOnlineStatus = async (
  driverId,
  isOnline
) => {

  return await Driver.update(
    {
      isOnline,
    },
    {
      where: {
        id: driverId,
      },
    }
  );
};
module.exports = {
    getAllDrivers,
    getDriverById,
    updateDriver,
    deleteDriver,
    setOnlineStatus
}
