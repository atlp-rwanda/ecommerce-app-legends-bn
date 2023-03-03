'use strict';
const { Model } = require('sequelize');
const role = require('./role');
module.exports = (sequelize, DataTypes) => {
  class rolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  rolePermission.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
          onDelete: 'CASCADE', // add cascade on delete
          onUpdate: 'CASCADE',
        },
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'permission',
          key: 'id',
          onDelete: 'CASCADE', // add cascade on delete
          onUpdate: 'CASCADE',
        },
      },
    },
    {
      sequelize,
      modelName: 'rolePermission',
      tableName: 'rolePermissions',
      timestamps: false,
    }
  );
  return rolePermission;
};
