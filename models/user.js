'use strict';
const {
  Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasMany(models.Transaction, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "ini bukan format email",
          },
          notEmpty: {
            msg: "wajib diisi",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "wajib diisi",
          },
          len: {
            args: [6],
            msg: "password harus minimal 6 karakter",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "wajib diisi",
          },
        },
      },
      points: {
        type: DataTypes.STRING,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true
    }
  );
  return User;
};