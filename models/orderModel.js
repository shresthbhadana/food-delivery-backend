module.exports = (sequelize, DataTypes) => {

  const Order = sequelize.define(
    "Order",

    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      items: {
        type: DataTypes.JSON,
        allowNull: false,
      },

      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      deliveryAddress: {
        type: DataTypes.JSON,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM(
          "not_accepted",
          "accepted",
          "ready",
          "fulfilled",
          "cancelled"
        ),

        allowNull: false,

        defaultValue: "not_accepted",
      },

      orderStatusState: {
        type: DataTypes.JSON,
        defaultValue: {},
      },

      statusCount: {
        type: DataTypes.JSON,
        defaultValue: {},
      },

      driver: {
        type: DataTypes.JSON,
        defaultValue: {},
      },

      preparationTime: {
        type: DataTypes.INTEGER,
      },

      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      commissionPercent: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      deliveryCharge: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      orderForSomeoneElse: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      pickupNumber: {
        type: DataTypes.STRING,
      },

      promoCodeId: {
        type: DataTypes.STRING,
      },
    },

    {
      tableName: "ordersNew",

      timestamps: false,

      indexes: [
        {
          fields: ["status", "createdAt"],
        },

        {
          fields: ["userId", "createdAt"],
        },
      ],
    }
  );

  return Order;
};
