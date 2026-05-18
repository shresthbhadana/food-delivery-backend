module.exports = (sequelize, DataTypes) => {
  const OrderTracker = sequelize.define(
    "OrderTracker",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "orderTrackerNew",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["productId"],
        },
      ],
    }
  );

  return OrderTracker;
};
