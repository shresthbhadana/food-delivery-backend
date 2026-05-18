const scheduledMessageRepository = require("../repository").scheduleRepo;
 


const createMessage =
  async (payload) => {

    if (!payload.title) {
      throw new Error(
        "Title is required"
      );
    }

    if (!payload.message) {
      throw new Error(
        "Message is required"
      );
    }

    if (!payload.scheduledTime) {
      throw new Error(
        "Scheduled time is required"
      );
    }

    if (!payload.frequency) {
      throw new Error(
        "Frequency is required"
      );
    }

    return await scheduledMessageRepository
      .createMessage(payload);
};

const getAllMessages =
  async () => {

    return await scheduledMessageRepository
      .getAllMessages();
};

const updateMessage =
  async (id, payload) => {

    if (!id) {
      throw new Error(
        "Id is required"
      );
    }

    return await scheduledMessageRepository
      .updateMessage(
        id,
        payload
      );
};

const deleteMessage =
  async (id) => {

    if (!id) {
      throw new Error(
        "Id is required"
      );
    }

    return await scheduledMessageRepository
      .deleteMessage(id);
};

module.exports = {
  createMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
};