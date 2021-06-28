'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('trends', [
      {
        id: uuidv4(),
        ogp_id: uuidv4(),
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
