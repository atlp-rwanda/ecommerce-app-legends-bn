process.env.NODE_ENV = 'test';
import db from './src/models';

module.exports = async () => { // export a globalSetup function
  await db.sequelize.drop();
  await db.sequelize.sync();
};
