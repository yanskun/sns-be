'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('trends', 'ogp_id')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('trends', 'ogp_id', {
      type: Sequelize.UUID,
    })
  }
};
