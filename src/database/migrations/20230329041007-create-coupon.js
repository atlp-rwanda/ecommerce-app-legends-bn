'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Coupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      discount_rate: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      expire_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      max_usage: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      usage: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      status: {
        defaultValue: 'ACTIVE',
        type: Sequelize.ENUM(['ACTIVE', 'DEACTIVE']),
      },
      vendorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references:{
         
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Coupons');
  },
};
