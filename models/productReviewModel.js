module.exports = (sequelize, DataTypes) => {

  const ProductReview = sequelize.define(
    "ProductReview",
    {

   id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
  allowNull: false,
},
      productId: {
        type: DataTypes.UUID,
        allowNull: false,

        references: {
          model: "Products",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      comment: {
        type: DataTypes.TEXT,
      },

      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

    },
    {
      updatedAt: false,
    }
  );

  return ProductReview;
};