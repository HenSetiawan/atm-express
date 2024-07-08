'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('accounts', [{
      id:  uuidv4(),
      userId: "5d269eed-369d-498e-933c-1bd558d71329",
      type:"GOLD",
      balance:10000000,
      accountNumber:12345678,
    },],{});
  },

  async down (queryInterface, Sequelize) {
  }
};
