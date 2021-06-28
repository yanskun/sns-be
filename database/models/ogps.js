'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ogps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ogps.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      default: DataTypes.UUIDV4,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    src: DataTypes.STRING,
    href: DataTypes.STRING,
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      default: Sequelize.NOW
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      default: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'ogps',
    underscored: true,
  });
  return ogps;
};
