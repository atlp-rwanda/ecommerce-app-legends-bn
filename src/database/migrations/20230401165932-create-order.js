'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      amount: {
        allowNull: false,
        type: Sequelize.STRING
      },
      products: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      status: {
        allowNull : false,
        type: Sequelize.STRING
      },
      location: {
        allowNull : false,
        type: Sequelize.STRING
      },
      userId:{
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
      trackingNumber:{
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};