module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    "UserProfile",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      roles: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: ["user"],
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
      permissions: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
      fcmToken: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      isAnonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "userProfiles",
      timestamps: false,
      indexes: [
        {
          fields: ["name"],
        },
        {
          fields: ["isAnonymous", "createdAt"],
        },
        {
          fields: ["deleted", "isAnonymous", "createdAt"],
        },
        {
          unique: true,
          fields: ["email"],
        },
      ],
    }
  );

  return UserProfile;
};