'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('tags', [
      {
        id: "f4bb8614-240e-77ef-1f17-ff468e58cb9d",
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
