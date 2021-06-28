'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('trends', [
      {
        id: "c07467db-83b7-47a5-a141-1fc2ddcb1ec5",
        comment: "comment",
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('trends', null, {});
  }
};
