'use strict';

import fs from'fs';
import path from'path';
import Sequelize from'sequelize';
import dotenv from "dotenv";
dotenv.config();
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(process.env.DEV_DATABASE_URL);

}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
export const dbConnection=sequelize.authenticate().then(
  ()=>console.log(`database connection established in ${env} database`)
).catch(err=>console.log('unable to connect to the database',err))
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
