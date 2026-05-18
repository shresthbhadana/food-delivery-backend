const scheduledMessageService = require("../services").scheduleMessageService;
const logger = require("../utils/logger");
 
const createMessage =
  async (req, res) => {

    try {

      const payload = {

        title:
          req.body.title,

        message:
          req.body.message,

        isActive:
          req.body.isActive,

        scheduledTime:
          req.body.scheduledTime,

        frequency:
          req.body.frequency,
      };

      const response =
        await scheduledMessageService
          .createMessage(
            payload
          );
      logger.info("message created successfully");
      return res.status(201).json({
        success: true,
        data: response,
      });

    } catch (error) {
logger.error(`something went wrong while creating scheduled message : ${error}`);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

const getAllMessages =
  async (req, res) => {

    try {

      const response =
        await scheduledMessageService
          .getAllMessages();

      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
logger.error("something went wrong while getting all scheduled messages : ${error}")
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

const updateMessage =
  async (req, res) => {

    try {

      const payload = {

        title:
          req.body.title,

        message:
          req.body.message,

        isActive:
          req.body.isActive,

        scheduledTime:
          req.body.scheduledTime,

        frequency:
          req.body.frequency,
      };

      const response =
        await scheduledMessageService
          .updateMessage(
            req.params.id,
            payload
          );
logger.info("message updated successfully");
      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
logger.error(`something went wrong while updating scheduled message : ${error}`)
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

const deleteMessage =
  async (req, res) => {

    try {

      const response =
        await scheduledMessageService
          .deleteMessage(
            req.params.id
          );
logger.info("message deleted successfully")
      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
logger.error(`something went wrong while deleting scheduled message : ${error}`)
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

module.exports = {
  createMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
};