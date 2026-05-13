module.exports = (sequelize, DataTypes) => {

  const PromoCode = sequelize.define(
    "PromoCode",
    {

      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      discountType: {
        type: DataTypes.ENUM(
          "percentage",
          "flat"
        ),
        allowNull: false,
      },

      discountValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      conditions: {
        type: DataTypes.JSON,
        defaultValue: {},
      },

      minPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        defaultValue: "Active",
      },

      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

    },
    {
      updatedAt: true,

      indexes: [

        {
          unique: true,
          fields: ["code"],
        },

        {
          fields: ["status"],
        },

        {
          fields: ["expiryDate"],
        },

      ],
    }
  );

  return PromoCode;
};