const restroService = require("../services/index").restroService;
const logger = require("../utils/logger");

// PUT /admin/openAndCloseAllRestaurants
const openAndCloseAllRestaurants = async (req, res) => {
  try {
    const { isOpen } = req.body;
    if (typeof isOpen !== "boolean") {
      return res.status(400).json({ success: false, message: "isOpen must be a boolean" });
    }
    const response = await restroService.openOrCloseAllRestro(isOpen);
    logger.info(`All restaurants ${isOpen ? "opened" : "closed"}`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Open/Close All Restaurants Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const createRestro = async (req, res) => {
  try {
    const result = await restroService.createRestro(req.body);
    logger.info(`Restaurant created: ${result.id}`);
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    logger.error(`Create Restaurant Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllRestro = async (req, res) => {
  try {
    const response = await restroService.getAllRestro();
    logger.info(`Fetched all restaurants (admin)`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Get All Restaurants Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getRestroById = async (req, res) => {
  try {
    const response = await restroService.getRestroById(req.params.id);
    if (!response) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }
    logger.info(`Fetched restaurant: ${req.params.id}`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Get Restaurant Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const updateRestro = async (req, res) => {
  try {
    const response = await restroService.updateRestro(req.params.id, req.body);
    logger.info(`Restaurant updated: ${req.params.id}`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Update Restaurant Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteRestro = async (req, res) => {
  try {
    const response = await restroService.deleteRestro(req.params.id);
    logger.info(`Restaurant deleted: ${req.params.id}`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Delete Restaurant Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const toggleRestroStatus = async (req, res) => {
  try {
    const { isOpen } = req.body;
    if (typeof isOpen !== "boolean") {
      return res.status(400).json({ success: false, message: "isOpen must be a boolean" });
    }
    const response = await restroService.toggleRestroStatus(req.params.id, isOpen);
    logger.info(`Restaurant ${req.params.id} status set to ${isOpen}`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Toggle Restaurant Status Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getUserRestaurants = async (req, res) => {
  try {
    const response = await restroService.getAllOpenRestro();
    logger.info(`Customer fetched open restaurants`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Get Open Restaurants Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const getUserRestaurantById = async (req, res) => {
  try {
    const response = await restroService.getRestroById(req.params.id);
    if (!response) {
      return res.status(404).json({ success: false, message: "Restaurant not found" });
    }
    logger.info(`Customer fetched restaurant: ${req.params.id}`);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Get Restaurant By ID Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  openAndCloseAllRestaurants,
  createRestro,
  getAllRestro,
  getRestroById,
  updateRestro,
  deleteRestro,
  toggleRestroStatus,
  getUserRestaurants,
  getUserRestaurantById,
};