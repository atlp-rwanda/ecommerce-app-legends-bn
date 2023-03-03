import express from 'express';
import rootRouter from './api/root';
import userRouter from './api/user.routes'
import docs from './docs/index';

const app = express();
import { dbConnection } from './models/index';

dbConnection;

// built-in middleware to handle urlencoded form data
app.use(express.json());
// routes
app.use('/', rootRouter);
app.use('/api', userRouter);

app.use(docs);

app.all('*', (req, res) => { res.json({ error: '404 Not Found' }); });

const PORT = process.env.PORT || 4000;
// start server on port || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app 