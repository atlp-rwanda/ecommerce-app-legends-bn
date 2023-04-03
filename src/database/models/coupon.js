'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'vendorId' })
      this.hasMany(models.CouponProduct, { foreignKey: 'couponId' })
    }
  }
  Coupon.init({
    code: DataTypes.STRING,
    discount_rate: DataTypes.INTEGER,
    expire_at: DataTypes.DATE,
    max_usage: DataTypes.INTEGER,
    usage: DataTypes.INTEGER,
    status: DataTypes.STRING,
    vendorId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};