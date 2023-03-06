import express from 'express';
import rootRouter from './api/root';
import userRouter from './api/user.routes'
import docs from './docs/index';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import { dbConnection } from './models/index';

i18next.use(Backend).use(middleware.LanguageDetector)
.init({
    fallbackLng: 'en',
    backend: {
        loadPath: './src/locales/{{lng}}/translation.json',
    }
})
const app = express();

dbConnection;

// built-in middleware to handle urlencoded form data
app.use(express.json());
app.use(middleware.handle(i18next));
// routes
app.use('/', rootRouter);
app.use('/api', userRouter);
app.use(docs);

app.all('*', (req, res) => { res.json({ error: req.t('404_error') }); });

const PORT = process.env.PORT || 4000;
// start server on port || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app