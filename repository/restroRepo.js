const db = require("../models/index");
const restro = db.restro;

const openOrCloseAllRestro = async (isOpen) => {
  return await restro.update({ isOpen }, { where: {} });
};
const createRestro = async (body) => {
  return await restro.create(body);
};
const getAllRestro = async () => {
  return await restro.findAll();
};
const updateRestro = async (id, body) => {
  return await restro.update(body, { where: { id } });
};
const deleteRestro = async (id) => {
  return await restro.destroy({ where: { id } });
};
const getRestroById = async (id) => {
  return await restro.findByPk(id);
};
const toggleRestroStatus = async (id, isOpen) => {
  return await restro.update({ isOpen }, { where: { id } });
};
const getAllOpenRestro = async () => {
  return await restro.findAll({ where: { isOpen: true } });
};
module.exports = {
  openOrCloseAllRestro,
  createRestro,
  getAllRestro,
  updateRestro,
  deleteRestro,
  getRestroById,
  toggleRestroStatus,
  getAllOpenRestro,
};