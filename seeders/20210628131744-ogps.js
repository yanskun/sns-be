'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('ogps', [
      {
        id: "8f286d58-3177-76c6-df70-f304fda42e3f",
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
