'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CouponProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Coupon, {foreignKey: 'couponId' })
      this.belongsTo(models.ProductAttribute, {foreignKey: 'prodcutAttributeId' })
    }
  }
  CouponProduct.init({
    couponId: DataTypes.INTEGER,
    prodcutAttributeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CouponProduct',
  });
  return CouponProduct;
};