const { userService } = require("../services/index");
const logger = require("../utils/logger");

const disableEnableUserAccount = async (req, res) => {
  try {
    logger.info(`Disable/Enable User Account API Called for User: ${req.body.userId}`);
    const response = await userService.disableEnableUserAccount(req.body.userId, req.body.isDisabled);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Disable/Enable User Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    logger.info(`Delete User Account API Called for User: ${req.body.userId}`);
    const response = await userService.deleteUserAccount(req.body.userId);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Delete User Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addSubAdmin = async (req, res) => {
  try {
    logger.info("Add Sub-Admin API Called");
    const response = await userService.addSubAdmin(req.body);
    return res.status(201).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Add Sub-Admin Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getSubAdminById = async (req, res) => {
  try {
    logger.info(`Get Sub-Admin API Called: ${req.params.id}`);
    const response = await userService.getSubAdminById(req.params.id);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Get Sub-Admin Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSubAdminById = async (req, res) => {
  try {
    logger.info(`Delete Sub-Admin API Called: ${req.params.id}`);
    const response = await userService.deleteSubAdminById(req.params.id);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Delete Sub-Admin Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserAndPermissions = async (req, res) => {
  try {
    logger.info(`Update Sub-Admin Permissions API Called: ${req.body.userId}`);
    const response = await userService.updateUserAndPermissions(req.body.userId, req.body);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Update Sub-Admin Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const adminGetAllUsers = async (req, res) => {
  try {
    logger.info("Admin Get All Users API Called");
    const response = await userService.adminGetAllUsers(req.query);
    return res.status(200).json({ success: true, total: response.length, data: response });
  } catch (error) {
    logger.error(`Get All Users Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const adminGetUserById = async (req, res) => {
  try {
    logger.info(`Admin Get User By Id API Called: ${req.params.id}`);
    const response = await userService.adminGetUserById(req.params.id);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Get User By Id Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const adminUpdateUser = async (req, res) => {
  try {
    logger.info(`Admin Update User API Called: ${req.body.userId}`);
    const response = await userService.adminUpdateUser(req.body.userId, req.body);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    logger.error(`Update User Error: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  disableEnableUserAccount,
  deleteUserAccount,
  addSubAdmin,
  getSubAdminById,
  deleteSubAdminById,
  updateUserAndPermissions,
  adminGetAllUsers,
  adminGetUserById,
  adminUpdateUser,
};
