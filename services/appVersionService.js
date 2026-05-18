
const userAppVersionRepository =
  require(
    "../repository/index"
  ).appVersionRepo;

const addUserAppVersion =
  async (payload) => {

    if (!payload.userId) {
      throw new Error(
        "User id is required"
      );
    }

    if (!payload.appVersion) {
      throw new Error(
        "App version is required"
      );
    }

    const existingVersion =
      await userAppVersionRepository
        .findVersion(
          payload.userId,
          payload.appVersion
        );

    

    if (existingVersion) {
      return null;
    }

    return await userAppVersionRepository
      .createVersion(payload);
};

const getAllVersions =
  async () => {

    return await userAppVersionRepository
      .getAllVersions();
};

module.exports = {
  addUserAppVersion,
  getAllVersions,
};