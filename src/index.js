import express from 'express';
import rootRouter from './routes/root';
import adminRouter from './routes/users/adminRoutes';
import userAuthRoutes from './routes/users/userRoutes';
import google_auth from './routes/users/google_oauth.routes'
import vendorRouter from './routes/users/vendorRoutes';
import categoryRoutes from './routes/products/category'
import productRoutes from './routes/products/productsRoutes'
import wishlistRoutes from './routes/products/wishlist';
import buyerRoutes from './routes/products/buyer.routes'
import docs from './docs/index';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import db from './database/models/index';

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './src/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false, // allows for nested translations
      prefix: '{{',
      suffix: '}}'
    }
  });
const app = express();

// built-in middleware to handle urlencoded form data
app.use(express.json());
app.use(middleware.handle(i18next));

// routes
app.use('/', rootRouter);
app.use(docs);
app.use(adminRouter);
app.use(vendorRouter);
app.use('/api/v1', userAuthRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use(productRoutes);
app.use(google_auth)
app.use(wishlistRoutes)
app.use('/api/v1/buyers',buyerRoutes)


app.all('*', (req, res) => {
  res.json({ error: req.t('404_error') });
});

const PORT = process.env.PORT || 4000;

db.dbConnection;
db.sequelize.sync({ force: false }).then(async () => {
  console.log('DB synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;
