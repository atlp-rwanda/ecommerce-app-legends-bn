process.env.NODE_ENV = 'test';
import db from './src/models';

module.exports = async () => { 
  await db.sequelize.drop();
  await db.sequelize.sync();
};