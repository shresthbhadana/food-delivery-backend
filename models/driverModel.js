module.exports = (sequelize, DataTypes) => {

  const Driver = sequelize.define(
    "Driver",
    {

      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },

      location: {
        type: DataTypes.JSON,
        allowNull: false,
      },

      fcmToken: {
        type: DataTypes.JSON,
        defaultValue: [],
      },

      isOnline: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      vehicleType: {
        type: DataTypes.STRING,
      },

      vehicleNumber: {
        type: DataTypes.STRING,
      },

    },
    {
      timestamps: true,

      indexes: [

        {
          fields: ["isOnline"],
        },

        {
          fields: ["vehicleType"],
        },

      ],
    }
  );

  return Driver;
};