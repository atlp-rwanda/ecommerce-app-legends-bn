'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   
  }
  OrderDetails.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: require('sequelize').UUIDV4,
      },
      name: DataTypes.STRING,
      color:  DataTypes.STRING,
      size:  DataTypes.STRING,
      quantity:  DataTypes.STRING,
      price:  DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'OrderDetails',
    }
  );
  return OrderDetails;
};
