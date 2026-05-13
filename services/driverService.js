const driverRepo = require("../repository").driverRepo;
const getAllDrivers = async()=>{
    const drivers = await driverRepo.getAllDrivers();
    if(!drivers || drivers.length === 0){
        throw new Error("No drivers found");
    }
    return drivers;
}
const getDriverById = async(id)=>{
    const driver = await driverRepo.getDriverById(id);
    if(!driver){
        throw new Error("Driver not found");
    }
    return driver;
};
const updateDriver = async(id,body)=>{
    if(!id || !body){
        throw new Error("id and body are required");
    }
    const updatedDriver = await driverRepo.updateDriver(id,body);
    if(!updatedDriver){
        throw new Error("Driver not found");
    }
    return updatedDriver;
};
const deleteDriver = async(id)=>{
    if(!id){
        throw new Error("id is required");
    }
    const deletedDriver = await driverRepo.deleteDriver(id);
    if(!deletedDriver){
        throw new Error("Driver not found");
    }
    return deletedDriver;
};
const setOnlineStatus = async (driverId, isOnline) => {
    if (!driverId) {
        throw new Error("Driver ID is required");
    }
    const updatedDriver = await driverRepo.setOnlineStatus(driverId, isOnline);
    if (!updatedDriver) {
        throw new Error("Driver not found");
    }
    return updatedDriver;
};
const getOnlineDrivers = async () => {
    const drivers = await driverRepo.getAllDrivers();
    return drivers.filter(driver => driver.isOnline);
}
module.exports = {getAllDrivers,getDriverById,updateDriver,deleteDriver,setOnlineStatus,getOnlineDrivers};