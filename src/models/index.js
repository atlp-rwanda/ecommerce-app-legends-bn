'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
const basename = path.basename(__filename);
const config = require('../config/config.js');
const env = process.env.NODE_ENV;
const db = {};
let sequelize;
if (config[env].url) {
  sequelize = new Sequelize(config[env].url);
} else {
  sequelize = new Sequelize(process.env.DEV_DATABASE_URL);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
export const dbConnection = sequelize
  .authenticate()
  .then(() => console.log(env, 'database connection established'))
  .catch((err) => console.log('unable to connect to the database', err));
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.dbConnection = dbConnection;

module.exports = db;
