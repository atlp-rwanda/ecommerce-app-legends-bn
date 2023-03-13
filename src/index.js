import express from 'express';
import rootRouter from './api/root';
import userRouter from './api/user.routes';
import userAuthRoutes from './api/auth/userAuthRoutes'
import docs from './docs/index';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import db from './models/index';

import env from 'dotenv';
env.config();

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './src/locales/{{lng}}/translation.json',
    },
  });
const app = express();

// built-in middleware to handle urlencoded form data
app.use(express.json());
app.use(middleware.handle(i18next));
// routes
app.use('/', rootRouter);

app.use('/api/users', userRouter);
app.use('/api/v1', userAuthRoutes);
app.use(docs);
app.all('*', (req, res) => {
  res.json({ error: req.t('404_error') });
});

const PORT = process.env.PORT || 4000;

db.dbConnection;
db.sequelize.sync({ force: false }).then(async () => {
  
  process.env.NODE_ENV!='test' && console.log('DB synced');

  app.listen(PORT, () => process.env.NODE_ENV!='test' && console.log(`Server running on port ${PORT}`));
});

export default app;
