process.env.NODE_ENV = 'test';
import db from './src/models';

beforeAll(async () => {
  await db.sequelize.drop();
  await db.sequelize.sync();
});
