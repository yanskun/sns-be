'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trend_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  trend_tags.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      default: DataTypes.UUIDV4,
    },
    trend_id: DataTypes.UUIDV4,
    tag_id: DataTypes.UUIDV4
  }, {
    sequelize,
    modelName: 'trend_tags',
    underscored: true,
  });
  return trend_tags;
};
