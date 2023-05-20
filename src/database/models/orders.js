'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'userId' });
    
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: require('sequelize').UUIDV4,
      },
      amount: DataTypes.STRING,
      // products: DataTypes.ARRAY(DataTypes.STRING),
      status:  DataTypes.STRING,
      location:  DataTypes.STRING,
      userId: DataTypes.UUID,
      trackingNumber: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
