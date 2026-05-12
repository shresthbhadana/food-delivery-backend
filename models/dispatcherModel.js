const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Dispatcher = sequelize.define(
  "Dispatcher",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
     
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
     
    },
    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
     
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "Epoch milliseconds"
    }
  },
  {
    tableName: "dispatchers",
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Dispatcher;
