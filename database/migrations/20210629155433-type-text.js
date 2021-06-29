'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('trends', 'comment', {
        type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('tags', 'title', {
        type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('tags', 'color', {
        type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('tags', 'textColor', {
        type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('ogps', 'title', {
        type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('ogps', 'description', {
        type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('ogps', 'src', {
        type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('ogps', 'href', {
        type: Sequelize.TEXT
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('trends', 'comment', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('tags', 'title', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('tags', 'color', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('tags', 'textColor', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('ogps', 'title', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('ogps', 'description', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('ogps', 'src', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('ogps', 'href', {
        type: Sequelize.STRING
      }),
    ])
  }
};
