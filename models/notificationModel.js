module.exports = (sequelize, DataTypes) => {

  const Notification = sequelize.define(
    "Notification",
    {

      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

    },
    {
      updatedAt: false,

      indexes: [

        {
          fields: ["userId"],
        },

        {
          fields: ["isRead"],
        },

        {
          fields: ["status"],
        },

      ],
    }
  );

  return Notification;
};