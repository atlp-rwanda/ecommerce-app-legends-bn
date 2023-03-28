'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shoppingCarts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'buyer' });
      this.hasMany(models.ProductAttribute, { foreignKey: 'id' });
    }
  }
  shoppingCarts.init({
    buyer: DataTypes.STRING,
    product: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    totalpricePerProduct:DataTypes.INTEGER,
    cartStatus:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'shoppingCarts',
  });
  return shoppingCarts;
};