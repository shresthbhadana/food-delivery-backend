const driverService = require("../services/index").driverService;
const logger = require("../utils/logger");

const getAllDrivers = async(req,res)=>{
    try {
        const response = await driverService.getAllDrivers();
        logger.info("Fetched all drivers")
        return res.status(200).json({success:true,data:response})
    } catch (error) {
        logger.error(`Get All Drivers Error: ${error.message}`)
        return res.status(500).json({success:false,message:error.message})
    }
}
const getDriverById = async(req,res)=>{
    try {
        const response = await driverService.getDriverById(req.params.id);
        if(!response){
            return res.status(404).json({success:false,message:"Driver not found"})
        }
        logger.info(`Fetched driver: ${req.params.id}`)
        return res.status(200).json({success:true,data:response})
    } catch (error) {
        logger.error(`Get Driver Error: ${error.message}`)
        return res.status(500).json({success:false,message:error.message})
    }
    }
   const updateDriver = async (
  req,
  res
) => {

  try {

    const payload = {

      location: req.body.location,

      fcmToken: req.body.fcmToken,

      isOnline: req.body.isOnline,

      vehicleType: req.body.vehicleType,

      vehicleNumber:
        req.body.vehicleNumber,
    };

    const response =
      await driverService.updateDriver(
        req.params.id,
        payload
      );

    logger.info(
      `Driver updated: ${req.params.id}`
    );

    return res.status(200).json({
      success: true,
      data: response,
    });

  } catch (error) {

    logger.error(
      `Update Driver Error: ${error.message}`
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deletDriver = async(req,res)=>{
    try {
        const response = await driverService.deleteDriver(req.params.id);
        logger.info(`Driver deleted: ${req.params.id}`)
        return res.status(200).json({success:true,data:response})
    } catch (error) {
        logger.error(`Delete Driver Error: ${error.message}`)
        return res.status(500).json({success:false,message:error.message})
    }
};
const setDriverOnlineStatus = async(req,res)=>{
    try {
        const {id} = req.params;
        const {isOnline} = req.body;
        const response = await driverService.setOnlineStatus(id,isOnline);
        logger.info(`Driver ${id} status set to ${isOnline}`)
        return res.status(200).json({success:true,data:response})
    } catch (error) {
        logger.error(`Set Driver Online Status Error: ${error.message}`)
        return res.status(500).json({success:false,message:error.message})
    }
};
module.exports = {
    getAllDrivers,
    getDriverById,
    updateDriver,
    deletDriver,
    setDriverOnlineStatus
}
    