const { v4: uuidv4 } = require("uuid");
const restroRepo = require("../repository/index").restroRepo;

const openOrCloseAllRestro = async (isOpen) => {
  if (typeof isOpen !== "boolean") {
    throw new Error("isOpen must be a boolean");
  }
  return await restroRepo.openOrCloseAllRestro(isOpen);
};

const createRestro = async (body) => {
  const payload = {
    id: uuidv4(),
    restaurantName: body.restaurantName,
    vendorId: body.vendorId,
    location: body.location,
    isOpen: body.isOpen ?? true,
    isFeatured: body.isFeatured ?? false,
  };
  return await restroRepo.createRestro(payload);
};

const getAllRestro = async () => {
  return await restroRepo.getAllRestro();
};

const getRestroById = async (id) => {
  return await restroRepo.getRestroById(id);
};

const updateRestro = async (id, body) => {
  // Prevent ID from being changed
  const { id: _ignore, ...safeBody } = body;
  return await restroRepo.updateRestro(id, safeBody);
};

const deleteRestro = async (id) => {
  return await restroRepo.deleteRestro(id);
};

const toggleRestroStatus = async (id, isOpen) => {
  if (typeof isOpen !== "boolean") {
    throw new Error("isOpen must be a boolean");
  }
  return await restroRepo.toggleRestroStatus(id, isOpen);
};

// Customer-facing: only open restaurants
const getAllOpenRestro = async () => {
  return await restroRepo.getAllOpenRestro();
};

module.exports = {
  openOrCloseAllRestro,
  createRestro,
  getAllRestro,
  getRestroById,
  updateRestro,
  deleteRestro,
  toggleRestroStatus,
  getAllOpenRestro,
};