'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        permission.belongsToMany(models.role, {
          through: models.rolePermission,
        });
        
      // define association here
    }
  }
  permission.init(
    {
      name: { type: DataTypes.ARRAY(DataTypes.STRING)},
    },
    {
      sequelize,
      modelName: 'permission',
      tableName: 'permissions',
      timestamps: false,
    }
  );
  return permission;
};
