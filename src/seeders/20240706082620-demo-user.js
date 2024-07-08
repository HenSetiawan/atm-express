"use strict";
const { hashString } = require("../utils/hash");
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          fullName: "Budi",
          address: "jakarta Timur",
          username: "budi",
          password: await hashString("2024"),
          email: "budi@example.com",
          nik: 64112346878905483,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
