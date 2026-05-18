const notificationService = require("../services").notificationService;
const getAllNotifications =
  async (req, res) => {

    try {

      const userId = req.user.id;

      const response =
        await notificationService
          .getAllNotifications(
            userId
          );

      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

const markNotificationAsRead =
  async (req, res) => {

    try {

      const userId = req.user.id;

      const response =
        await notificationService
          .markAllAsRead(userId);

      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

const deleteAllNotifications =
  async (req, res) => {

    try {

      const userId = req.user.id;

      const response =
        await notificationService
          .deleteAllNotifications(
            userId
          );

      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

module.exports = {
  getAllNotifications,
  markNotificationAsRead,
  deleteAllNotifications,
};