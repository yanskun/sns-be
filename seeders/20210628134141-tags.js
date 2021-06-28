'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('tags', [
      {
        id: uuidv4(),
        title: 'front',
        color: "green",
        textColor: "white",
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  }
};
