const notificationRepository = require("../repository").notificationRepo;
const getAllNotifications =
  async (userId) => {

    return await notificationRepository
      .getAllNotifications(userId);
};

const markAllAsRead =
  async (userId) => {

    await notificationRepository
      .markAllAsRead(userId);

    return {
      message:
        "Notifications marked as read",
    };
};

const deleteAllNotifications =
  async (userId) => {

    await notificationRepository
      .deleteAllNotifications(userId);

    return {
      message:
        "Notifications deleted successfully",
    };
};

module.exports = {
  getAllNotifications,
  markAllAsRead,
  deleteAllNotifications,
};