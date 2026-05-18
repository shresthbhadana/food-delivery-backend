
const userAppVersionService =
  require(
    "../services/index"
  ).appVersionService;
const logger = require("../utils/logger");
const addUserAppVersion =
  async (req, res) => {

    try {

      const payload = {

        userId:
          req.user?.id ||
          req.body.userId,

        appVersion:
          req.body.appVersion,
      };

      const response =
        await userAppVersionService
          .addUserAppVersion(
            payload
          );
logger.info("app version recorded successfully");
      return res.status(201).json({

        success: true,

        message:
          response
            ? "Version recorded successfully"
            : "Duplicate version ignored",

        data: response,
      });

    } catch (error) {
      logger.error(`something went wrong while recording app version : ${error}`);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

const getAllVersions =
  async (req, res) => {

    try {

      const response =
        await userAppVersionService
          .getAllVersions();
      logger.info("app versions fetched successfully");
      return res.status(200).json({
        success: true,
        data: response,
      });

    } catch (error) {
logger.error(`something went wrong while getting all app versions : ${error}`);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

module.exports = {
  addUserAppVersion,
  getAllVersions,
};