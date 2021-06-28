'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  trends.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      default: DataTypes.UUIDV4,
    },
    ogp_id: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'trends',
    underscored: true,
  });
  return trends;
};
