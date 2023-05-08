'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  ProductRating.init({
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    productId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ProductRating',
  });
  return ProductRating;
};