"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TransactionVouchers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      transactionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Transactions",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      voucherId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Vouchers",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TransactionVouchers");
  },
};
