const db = require("../models");
const ScheduledMessage = db.ScheduledMessage;
const createMessage =
  async (payload) => {

    return await ScheduledMessage
      .create(payload);
};

const getAllMessages =
  async () => {

    return await ScheduledMessage
      .findAll({

        order: [
          ["createdAt", "DESC"],
        ],

      });
};

const updateMessage =
  async (id, payload) => {

    await ScheduledMessage
      .update(payload, {
        where: { id },
      });

    return await ScheduledMessage
      .findByPk(id);
};

const deleteMessage =
  async (id) => {

    return await ScheduledMessage
      .destroy({
        where: { id },
      });
};

module.exports = {
  createMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
};