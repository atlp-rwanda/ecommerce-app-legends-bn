process.env.NODE_ENV = 'test';
import db from './src/database/models';
import { asyncWrapper } from './src/utils/handlingTryCatchBlocks';

module.exports = asyncWrapper(async () => {
  // export a globalSetup function
    db.sequelize.sync();
});
