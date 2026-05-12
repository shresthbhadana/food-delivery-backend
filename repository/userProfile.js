const db = require("../models/index");
const userProfile = db.userProfile;

const createUser = async (data) => {
  return await userProfile.create(data);
};

const getUserById = async (id) => {
  return await userProfile.findByPk(id);
};

const updateUser = async (id, data) => {
  await userProfile.update(data, {
    where: { id },
  });
  return await userProfile.findByPk(id);
};

const deleteUser = async (id) => {
  return await userProfile.destroy({
    where: { id },
  });
};

const getAllUserProfiles = async (filters = {}) => {
  return await userProfile.findAll({
    where: filters,
    order: [["createdAt", "DESC"]],
  });
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUserProfiles,
};