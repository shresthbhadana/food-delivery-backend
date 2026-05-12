const { userProfile, Dispatcher } = require("../models/index");
const logger = require("../utils/logger");

class DispatcherService {
 
  static async addSubAdmin(data) {
    try {
      const { email, password, name, permissions } = data;
      logger.info(`DispatcherService.addSubAdmin email=${email} name=${name}`);

      const uid = `dispatcher_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      await userProfile.findOrCreate({
        where: { id: uid },
        defaults: {
          id: uid,
          name,
          email,
          password,
          roles: ["dispatcher"],
          permissions: permissions || {},
          fcmToken: [],
          isAnonymous: false,
          deleted: false,
          createdAt: Date.now()
        }
      });

      const dispatcher = await Dispatcher.create({
        id: uid,
        user_id: uid,
        permissions: permissions || {},
        createdAt: Date.now()
      });

      logger.info(`Sub-Admin/Dispatcher created: ${uid}`);
      return {
        success: true,
        message: "Sub-Admin/Dispatcher created successfully",
        data: dispatcher
      };
    } catch (error) {
      logger.error(`Error adding Sub-Admin: ${error.message}`);
      throw error;
    }
  }

 
  static async getSubAdminById(id) {
    try {
      const dispatcher = await Dispatcher.findByPk(id);

      if (!dispatcher) {
        return {
          success: false,
          message: "Sub-Admin/Dispatcher not found"
        };
      }

      const user = await userProfile.findByPk(id);

      return {
        success: true,
        data: {
          dispatcher,
          userProfile: user
        }
      };
    } catch (error) {
      logger.error(`Error fetching Sub-Admin: ${error.message}`);
      throw error;
    }
  }

  
  static async getAllSubAdmins(limit = 10, offset = 0) {
    try {
      const { count, rows } = await Dispatcher.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]]
      });

      return {
        success: true,
        total: count,
        limit,
        offset,
        data: rows
      };
    } catch (error) {
      logger.error(`Error fetching all Sub-Admins: ${error.message}`);
      throw error;
    }
  }

  static async updateUserAndPermissions(id, updateData) {
    try {
      const { name, email, password, permissions } = updateData;

      const profileUpdate = {};
      if (name) profileUpdate.name = name;
      if (email) profileUpdate.email = email;
      if (password) profileUpdate.password = password;

      if (Object.keys(profileUpdate).length) {
        await userProfile.update(profileUpdate, { where: { id } });
      }

      
      if (permissions) {
        await Dispatcher.update(
          { permissions, updatedAt: Date.now() },
          { where: { id } }
        );
      }

      logger.info(`Sub-Admin/Dispatcher updated: ${id}`);
      return {
        success: true,
        message: "Sub-Admin/Dispatcher updated successfully"
      };
    } catch (error) {
      logger.error(`Error updating Sub-Admin: ${error.message}`);
      throw error;
    }
  }

  
  static async deleteSubAdminById(id) {
    try {
      await userProfile.update(
        { deleted: true },
        { where: { id } }
      );

      await Dispatcher.destroy({
        where: { id }
      });

      logger.info(`Sub-Admin/Dispatcher deleted: ${id}`);
      return {
        success: true,
        message: "Sub-Admin/Dispatcher deleted successfully"
      };
    } catch (error) {
      logger.error(`Error deleting Sub-Admin: ${error.message}`);
      throw error;
    }
  }


  static async updatePermissions(id, permissions) {
    try {
      const dispatcher = await Dispatcher.update(
        { permissions, updatedAt: Date.now() },
        { where: { id }, returning: true }
      );

      logger.info(`Permissions updated for dispatcher: ${id}`);
      return {
        success: true,
        message: "Permissions updated successfully",
        data: dispatcher[1][0]
      };
    } catch (error) {
      logger.error(`Error updating permissions: ${error.message}`);
      throw error;
    }
  }


  static async hasPermission(dispatcherId, permissionKey) {
    try {
      const dispatcher = await Dispatcher.findByPk(dispatcherId);

      if (!dispatcher) return false;

      return dispatcher.permissions[permissionKey] === true;
    } catch (error) {
      logger.error(`Error checking permission: ${error.message}`);
      return false;
    }
  }
}

module.exports = DispatcherService;
