module.exports = (sequelize, DataTypes) => {

  const Product = sequelize.define(
    "Product",
    {

      id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
  allowNull: false,
},

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
      },

      restaurantId: {
        type: DataTypes.STRING,
        allowNull: false,

        references: {
          model: "Restros",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      restaurantName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      vendorId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      vendorPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      variants: {
        type: DataTypes.JSON,
        defaultValue: [],
      },

      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      cuisines: {
        type: DataTypes.JSON,
        defaultValue: [],
      },

      categories: {
        type: DataTypes.JSON,
        defaultValue: [],
      },

      spiciness: {
        type: DataTypes.INTEGER,
      },

      thumbnail: {
        type: DataTypes.STRING,
      },

      imageList: {
        type: DataTypes.JSON,
        defaultValue: [],
      },

      averageRating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },

      ratingCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

    },
    {
      timestamps: true,

      indexes: [

        // Restaurant composite indexes

        {
          fields: [
            "restaurantId",
            "averageRating",
          ],
        },

        {
          fields: [
            "restaurantId",
            "name",
          ],
        },

        {
          fields: [
            "restaurantId",
            "price",
          ],
        },

        // Featured products

        {
          fields: [
            "isFeatured",
            "name",
          ],
        },

        // Additional indexes

        {
          fields: ["vendorId"],
        },

        {
          fields: ["averageRating"],
        },

        {
          fields: ["price"],
        },

        {
          fields: ["restaurantId"],
        },

      ],
    }
  );

  return Product;
};