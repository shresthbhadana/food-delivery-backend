module.exports = (sequelize, DataTypes) => {
  const PopularMeal = sequelize.define(
    "PopularMeal",
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
      },
      productData: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      tableName: "popularMeals",
      timestamps: true,
      indexes: [
        {
          fields: ["orderCount"],
        },
      ],
    }
  );

  return PopularMeal;
};
