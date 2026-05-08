module.exports = (sequelize, DataTypes) => {

  const VendorOrder = sequelize.define(
    "VendorOrder",

    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      vendorId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      items: {
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

      preparationTime: {
        type: DataTypes.INTEGER,
      },

      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      driver: {
        type: DataTypes.JSON,
        defaultValue: {},
      },

      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      deliveryAddress: {
        type: DataTypes.JSON,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },

    {
      tableName: "vendorOrdersNew",

      timestamps: false,

      indexes: [
        {
          fields: ["status", "createdAt"],
        },

        {
          fields: ["vendorId", "createdAt"],
        },

        {
          fields: [
            "status",
            "vendorId",
            "createdAt",
          ],
        },
      ],
    }
  );

  return VendorOrder;
};