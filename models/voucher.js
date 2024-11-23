'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.belongsTo(models.Brand, {
        foreignKey: "brandId",
        targetKey: "id",
        as:"dataBrand"
      });

      Voucher.belongsToMany(models.Transaction, {
        through:'TransactionVoucher',
        foreignKey:'voucherId',
        as:'transactions'
      })
    }
  }
  Voucher.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nameVoucher: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "wajib diisi",
          },
        },
      },
      brandId: {
        type: DataTypes.UUID,
        references: {
          model: "Brands",
          key: "id",
        },
      },
      costInPoints: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "wajib diisi",
          },
        },
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "wajib diisi",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
          len: {
            args: [6],
            msg: "description harus minimal 6 karakter",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Voucher",
      timestamps: true,
    }
  );
  return Voucher;
};