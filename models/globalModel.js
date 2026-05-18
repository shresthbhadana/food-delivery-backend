module.exports = (sequelize, DataTypes) => {

  const Setting = sequelize.define(
    "Setting",
    {

      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      commissionPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },

      deliveryCharge: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },

      changeTo: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },

    },
    {
      timestamps: true,

      indexes: [

        {
          fields: [
            "commissionPercentage",
          ],
        },

        {
          fields: [
            "deliveryCharge",
          ],
        },

      ],
    }
  );

  return Setting;
};