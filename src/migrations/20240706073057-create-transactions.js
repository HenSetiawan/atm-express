'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      senderAccount:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references:{
          model:'accounts',
          key:'id'
        }
      },
      recepientAccount:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references:{
          model:'accounts',
          key:'id'
        }
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      type: {
        type: Sequelize.ENUM('deposito','transfer'),
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};