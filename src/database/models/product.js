'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
      this.belongsTo(models.user, { foreignKey: 'userId' });
      this.hasMany(models.ProductAttribute, { foreignKey: 'productId' });
      this.hasMany(models.ProductImage, { foreignKey: 'productId' });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: require('sequelize').UUIDV4,
      },
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      model: DataTypes.STRING,
      image: DataTypes.STRING,
      keyword: DataTypes.STRING,
      status: DataTypes.ENUM('AVAILABLE', 'UNAVAILABLE'),
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.UUID,
      expiredAt: DataTypes.DATE,
      avgRating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      cloudinaryId: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
