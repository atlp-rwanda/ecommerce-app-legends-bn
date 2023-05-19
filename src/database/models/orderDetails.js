'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order2Details extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // this.belongsTo(models.user, { foreignKey: 'vendorId' })
            // this.hasMany(models.CouponProduct, { foreignKey: 'couponId' })
            // define association here
            this.belongsTo(models.Order, { foreignKey: 'orderId' });
        }
    }
    Order2Details.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: require('sequelize').UUIDV4,
        },
        name: DataTypes.STRING,
        color: DataTypes.STRING,
        size: DataTypes.STRING,
        quantity: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.STRING,
        // priductAttId : DataTypes.INTEGER,
        orderId: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'Order2Details',
    });
    return Order2Details;
};