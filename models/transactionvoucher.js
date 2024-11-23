"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionVoucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionVoucher.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      transactionId: {
        allowNull: false,
        type:  DataTypes.UUID,
        references: {
          model: "Transactions",
          key: "id",
        },
      },
      voucherId: {
        allowNull: false,
        type:  DataTypes.UUID,
        references: {
          model: "Vouchers",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionVoucher",
      timestamps: true,
    }
  );
  return TransactionVoucher;
};
