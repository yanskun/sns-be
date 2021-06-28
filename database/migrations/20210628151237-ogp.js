'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ogps', 'trend_id', {
      type: Sequelize.UUID,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('ogps', 'trend_id')
  },
};
