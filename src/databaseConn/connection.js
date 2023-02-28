const { Sequelize } = require('sequelize');
export const connection=()=>{
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
// Create a new Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, config);
// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
}
