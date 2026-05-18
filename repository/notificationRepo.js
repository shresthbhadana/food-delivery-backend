const { Notification } = require(
  "../models"
);

const getAllNotifications =
  async (userId) => {

    return await Notification.findAll({

      where: {
        userId,
      },

      order: [
        ["createdAt", "DESC"],
      ],

    });
};

const markAllAsRead =
  async (userId) => {

    return await Notification.update(
      {
        isRead: true,
      },
      {
        where: {
          userId,
        },
      }
    );
};

const deleteAllNotifications =
  async (userId) => {

    return await Notification.destroy({
      where: {
        userId,
      },
    });
};

module.exports = {
  getAllNotifications,
  markAllAsRead,
  deleteAllNotifications,
};