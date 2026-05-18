module.exports = (
  sequelize,
  DataTypes
) => {

  const AppVersion =
    sequelize.define(
      "AppVersion",
      {

        id: {
          type: DataTypes.UUID,
          defaultValue:
            DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },

        userId: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        appVersion: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        createdAt: {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue:
            Date.now,
        },

      },
      {
        updatedAt: false,

        indexes: [

          {
            unique: true,

            fields: [
              "userId",
              "appVersion",
            ],
          },

          {
            fields: ["userId"],
          },

          {
            fields: ["appVersion"],
          },

        ],
      }
    );

  return AppVersion;
};