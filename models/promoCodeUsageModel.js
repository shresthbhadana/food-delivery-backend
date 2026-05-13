module.exports = (sequelize, DataTypes) => {

  const PromoCodeUsage = sequelize.define(
    "PromoCodeUsage",
    {

      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      promoCodeId: {
        type: DataTypes.UUID,
        allowNull: false,

        references: {
          model: "PromoCodes",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      orderId: {
        type: DataTypes.UUID,
      },

      count: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
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
          fields: ["promoCodeId"],
        },

        {
          fields: ["userId"],
        },

      ],
    }
  );

  return PromoCodeUsage;
};