module.exports = (
  sequelize,
  DataTypes
) => {

  const Payment =
    sequelize.define(
      "Payment",
      {

        id: {
          type: DataTypes.UUID,
          defaultValue:
            DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },

        orderId: {
          type: DataTypes.UUID,
          allowNull: false,

          references: {
            model: "ordersNew",
            key: "id",
          },

          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },

        userId: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },

        currency: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "AED",
        },

        status: {
          type: DataTypes.ENUM(
            "pending",
            "completed",
            "failed",
            "refunded"
          ),
          allowNull: false,
          defaultValue: "pending",
        },

        gatewayTransactionId: {
          type: DataTypes.STRING,
          allowNull: true,
        },

        paymentMethod: {
          type: DataTypes.ENUM(
            "card",
            "wallet",
            "cash_on_delivery"
          ),
          allowNull: true,
        },

        createdAt: {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue:
            Date.now,
        },

        updatedAt: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },

      },
      {
        timestamps: false,

        indexes: [

          {
            fields: ["orderId"],
          },

          {
            fields: ["userId"],
          },

          {
            fields: ["status"],
          },

          {
            fields: [
              "gatewayTransactionId",
            ],
          },

          {
            fields: [
              "paymentMethod",
            ],
          },

        ],
      }
    );

  return Payment;
};