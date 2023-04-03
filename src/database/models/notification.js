'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notification.init({
    subject: DataTypes.STRING,
    message: DataTypes.STRING,
    type: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};