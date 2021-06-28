'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('ogps', [
      {
        id: uuidv4(),
        title: 'yasudanaoya · GitHub',
        description: "description",
        src: 'https://avatars.githubusercontent.com/u/43776161?v=4?s=400',
        href: "https://github.com/yasudanaoya",
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ogps', null, {});
  }
};
