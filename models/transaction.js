"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: "userId",
        
      });

      Transaction.belongsToMany(models.Voucher, {
        through: "TransactionVoucher",
        foreignKey: "transactionId",
        as: "vouchers",
      });
    }
  }
  Transaction.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "wajib diisi",
          },
        },
        references: {
          model: "Users",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "wajib diisi",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6],
            msg: "description harus minimal 6 karakter",
          },
        },
      },
      totalCost: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      transaction_date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      timestamps: true,
    }
  );
  return Transaction;
};
