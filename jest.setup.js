process.env.NODE_ENV = 'test';
import db from './src/models';

module.exports = async () => {
  // export a globalSetup function
  try {
    db.sequelize.sync();
  } catch (error) {
    throw error;
  }
};
