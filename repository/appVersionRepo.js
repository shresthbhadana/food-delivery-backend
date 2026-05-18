
const db = require("../models/index");
const AppVersion = db.AppVersion;
const findVersion =
  async (
    userId,
    appVersion
  ) => {

    return await AppVersion
      .findOne({

        where: {
          userId,
          appVersion,
        },

      });
};

const createVersion =
  async (payload) => {

    return await AppVersion
      .create(payload);
};

const getAllVersions =
  async () => {

    return await AppVersion
      .findAll({

        order: [
          ["createdAt", "DESC"],
        ],

      });
};

module.exports = {
  findVersion,
  createVersion,
  getAllVersions,
};