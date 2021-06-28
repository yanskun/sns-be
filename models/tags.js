'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tags.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      default: DataTypes.UUIDV4,
    },
    title: DataTypes.STRING,
    color: DataTypes.STRING,
    textColor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tags',
    underscored: true,
  });
  return tags;
};
