module.exports = (
  sequelize,
  DataTypes
) => {

  const ScheduledMessage =
    sequelize.define(
      "ScheduledMessage",
      {

        id: {
          type: DataTypes.UUID,
          defaultValue:
            DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },

        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },

        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },

        scheduledTime: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        frequency: {
          type: DataTypes.ENUM(
            "once",
            "daily",
            "every-2-days",
            "every-weeks",
            "every-months"
          ),
          allowNull: false,
        },

      },
      {
        timestamps: true,

        indexes: [

          {
            fields: ["isActive"],
          },

          {
            fields: ["scheduledTime"],
          },

          {
            fields: ["frequency"],
          },

        ],
      }
    );

  return ScheduledMessage;
};