module.exports = (sequelize, DataTypes) => {
  const Restro = sequelize.define("Restro", {
    
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },

    restaurantName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    vendorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

  },
  {
      indexes: [
        {
          fields: ["isFeatured", "restaurantName"],
        },
        {
          fields: ["vendorId", "restaurantName"],
        },
      ],
    }
);

  return Restro;
};