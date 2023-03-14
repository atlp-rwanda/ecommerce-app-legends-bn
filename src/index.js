import express from 'express';
import rootRouter from './api/root';
import userRouter from './api/user.routes';
import google_auth from './api/google_auth.routes'
import docs from './docs/index';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import db from './models/index';
import cookieParser from "cookie-parser";
// import session from 'express-session';
// import passport from 'passport';



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



// Configure express-session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// Initialize passport and restore authentication state, if any, from the session.
// app.use(passport.initialize());
// app.use(passport.session());
// built-in middlewares to handle urlencoded form data
app.use(express.json());
app.use(middleware.handle(i18next));
app.use(cookieParser());

// routes
app.use('/', rootRouter);
app.use('/api/users', userRouter);
app.use(google_auth)
app.use(docs);

app.all('*', (req, res) => {
  res.json({ error: req.t('failed to login') });
});

const PORT = process.env.PORT || 4000;

db.dbConnection;
db.sequelize.sync({ force: false }).then(async () => {
  console.log('DB synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;
