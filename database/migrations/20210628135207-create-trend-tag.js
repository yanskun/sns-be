'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trend_tags', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4
      },
      trend_id: {
        allowNull: false,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4
      },
      tag_id: {
        allowNull: false,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('trend_tags');
  }
};
