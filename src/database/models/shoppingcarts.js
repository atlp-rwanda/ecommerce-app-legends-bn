'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shopping2Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'buyer' });
      this.belongsTo(models.ProductAttribute, { foreignKey: 'product' });
    }
  }
  shopping2Carts.init({
    buyer: DataTypes.UUID,
    product: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalpricePerProduct:DataTypes.INTEGER,
    cartStatus:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'shopping2Carts',
  });
  return shopping2Carts;
};