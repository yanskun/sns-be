'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('trend_tags', [
      {
        id: uuidv4(),
        trend_id: "c07467db-83b7-47a5-a141-1fc2ddcb1ec5",
        tag_id: "f4bb8614-240e-77ef-1f17-ff468e58cb9d",
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('trend_tags', null, {});
  }
};
