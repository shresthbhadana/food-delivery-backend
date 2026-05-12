const DispatcherService = require("../services/dispatcherService");
const logger = require("../utils/logger");

class DispatcherController {

  static async addSubAdmin(req, res) {
    try {
      const { email, password, name, permissions } = req.body;
      logger.info(`DispatcherController.addSubAdmin req.body email=${email} name=${name}`);

      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          message: "Email, password, and name are required"
        });
      }

      const result = await DispatcherService.addSubAdmin({
        email,
        password,
        name,
        permissions
      });

      return res.status(201).json(result);
    } catch (error) {
      logger.error(`Add Sub-Admin Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: `Error: ${error.message}`
      });
    }
  }

 
  static async getSubAdminById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required"
        });
      }

      const result = await DispatcherService.getSubAdminById(id);

      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      logger.error(`Get Sub-Admin Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: `Error: ${error.message}`
      });
    }
  }

 
  static async getAllSubAdmins(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;

      const result = await DispatcherService.getAllSubAdmins(limit, offset);

      return res.status(200).json(result);
    } catch (error) {
      logger.error(`Get All Sub-Admins Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: `Error: ${error.message}`
      });
    }
  }

  
  static async updateUserAndPermissions(req, res) {
    try {
      const { id } = req.params;
      const { name, email, permissions } = req.body;
      const testMode = req.query.testMode === 'true';

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required"
        });
      }

      const result = await DispatcherService.updateUserAndPermissions(id, {
        name,
        email,
        permissions
      }, testMode);

      return res.status(200).json(result);
    } catch (error) {
      logger.error(`Update Sub-Admin Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: `Error: ${error.message}`
      });
    }
  }

 
  
  static async updatePermissions(req, res) {
    try {
      const { id } = req.params;
      const { permissions } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required"
        });
      }

      if (!permissions || typeof permissions !== "object") {
        return res.status(400).json({
          success: false,
          message: "Permissions must be a valid object"
        });
      }

      const result = await DispatcherService.updatePermissions(id, permissions);

      return res.status(200).json(result);
    } catch (error) {
      logger.error(`Update Permissions Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: `Error: ${error.message}`
      });
    }
  }

  
 
  static async deleteSubAdminById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID is required"
        });
      }

      const result = await DispatcherService.deleteSubAdminById(id);

      return res.status(200).json(result);
    } catch (error) {
      logger.error(`Delete Sub-Admin Error: ${error.message}`);
      return res.status(500).json({
        success: false,
        message: `Error: ${error.message}`
      });
    }
  }
}

module.exports = DispatcherController;
