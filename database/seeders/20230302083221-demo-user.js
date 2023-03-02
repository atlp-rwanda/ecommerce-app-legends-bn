'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('users', [{
        username: 'John Doe',
       firstname: 'dway',
       lastname: 'johnson',
       email: 'johnson@example.com',
       createdAt:'12-3-2023',
       updatedAt:'12-3-2023',
     }], {});
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
