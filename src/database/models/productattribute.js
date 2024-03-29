'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey : 'productId' })
      this.hasMany(models.shopping2Carts, { foreignKey : 'product' })
      this.hasMany(models.Order3Details, { foreignKey : 'productAttrId' })
    }
  }
  ProductAttribute.init({
    price: DataTypes.INTEGER,
    size: DataTypes.STRING,
    varitationName:DataTypes.STRING,
    color: DataTypes.STRING,
    productId: DataTypes.UUID,
    attrImage: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    cloudinaryId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductAttribute',
  });
  return ProductAttribute;
};