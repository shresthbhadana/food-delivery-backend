module.exports = (
  sequelize,
  DataTypes
) => {

  const DeliveryChargeSchedule =
    sequelize.define(
      "DeliveryChargeSchedule",
      {

        id: {
          type: DataTypes.UUID,
          defaultValue:
            DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },

        deliveryCharge: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },

        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        status: {
          type: DataTypes.ENUM(
            "Pending",
            "Completed"
          ),
          allowNull: false,
          defaultValue: "Pending",
        },

      },
      {
        timestamps: true,

        indexes: [

          {
            fields: ["status"],
          },

          {
            fields: ["startDate"],
          },

          {
            fields: ["endDate"],
          },

        ],
      }
    );

  return DeliveryChargeSchedule;
};